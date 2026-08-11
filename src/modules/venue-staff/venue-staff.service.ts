import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { MembershipStatus, PermissionScopeType, UserRole, VenueMemberRole } from '@prisma/client';
import * as argon2 from 'argon2';

import { presetFor } from '../../common/constants/venue-role-presets';
import { StaffPermissionService } from '../rbac/staff-permission.service';
import { PermissionResolverService } from '../rbac/permission-resolver.service';
import { assertPasswordStrength } from '../../common/utils/password-policy';
import { normaliseNepalPhone } from '../../common/utils/phone.util';

import { AuthService } from '../auth/auth.service';

import type {
  CreateVenueStaffInput,
  PreviewStaffLoginInput,
  RemoveVenueStaffInput,
  ResetVenueStaffPasswordInput,
  SetVenueStaffStatusInput,
  UpdateVenueStaffInput,
} from './dto/venue-staff.inputs';
import {
  CreateVenueStaffResult,
  StaffCreateOutcome,
  StaffCredentials,
  StaffLoginPreview,
  VenueStaffMember,
} from './dto/venue-staff.models';
import { generateStarterPassword, staffEmailDomain, uniqueStaffEmail } from './staff-login';
import { VenueStaffRepository, type StaffSeat } from './venue-staff.repository';

/**
 * Roles an owner may hand out from the staff screen.
 *
 * OWNER is missing on purpose. It carries `finance:payout` and `staff:manage`,
 * and it interacts with `Venue.primaryOwnerId` — adding a business partner is
 * a rarer and more consequential act than hiring a receptionist, and it should
 * not be one option down a dropdown on the hiring form.
 */
const ASSIGNABLE_ROLES: readonly VenueMemberRole[] = [
  VenueMemberRole.MANAGER,
  VenueMemberRole.FRONT_DESK,
  VenueMemberRole.STAFF,
  VenueMemberRole.COACH,
];

@Injectable()
export class VenueStaffService {
  private readonly logger = new Logger(VenueStaffService.name);

  constructor(
    private readonly repo: VenueStaffRepository,
    private readonly auth: AuthService,
    private readonly staffPermissions: StaffPermissionService,
    private readonly permissions: PermissionResolverService,
  ) {}

  /**
   * Give a seat the starting permissions its job title implies.
   *
   * Called when a seat is created, reactivated, or has its title changed. The
   * preset is a starting point, not a rule — it replaces the seat's grants for
   * this venue, so changing someone's title resets them to that title's set and
   * any hand-tuning is redone deliberately rather than silently surviving.
   */
  private async applyPreset(
    userId: string,
    venueId: string,
    role: VenueMemberRole,
    actorId: string,
  ): Promise<void> {
    await this.staffPermissions.setPermissions(
      userId,
      { scopeType: PermissionScopeType.VENUE, scopeId: venueId },
      [...presetFor(role)],
      actorId,
    );
  }

  /** Effective venue permissions for one seat. */
  private permissionsFor(userId: string, venueId: string): Promise<string[]> {
    return this.permissions.getVenueUserPermissions(userId, venueId);
  }

  async list(
    venueId: string,
    actorId: string,
    primaryOwnerId?: string,
  ): Promise<VenueStaffMember[]> {
    const venue = primaryOwnerId ? null : await this.repo.venueForStaff(venueId);
    const ownerId = primaryOwnerId ?? venue?.primaryOwnerId;
    const seats = await this.repo.listSeats(venueId);

    return Promise.all(
      seats.map(async (seat) =>
        mapSeat(seat, actorId, await this.permissionsFor(seat.userId, venueId), ownerId),
      ),
    );
  }

  /**
   * What the form would do if submitted as typed.
   *
   * Its real job is the warning: a single mistyped digit in the mobile can
   * point at a stranger's account in Pokhara, and attaching it would hand them
   * `bookings:write` at this venue with no notification and no trace. The
   * client turns `phoneBelongsToExistingAccount` into a confirmation step.
   *
   * It deliberately never returns the matched account's NAME. Doing so would
   * turn this into a phone-number-to-name lookup for the whole country,
   * available to anyone who runs a venue.
   */
  async preview(input: PreviewStaffLoginInput): Promise<StaffLoginPreview> {
    const venue = await this.requireVenue(input.venueId);

    const phone = tryNormalisePhone(input.phoneNumber);
    const existing = phone ? await this.repo.findUserByPhone(phone) : null;
    const seat = existing ? await this.repo.findSeatForUser(input.venueId, existing.id) : null;

    const name = input.fullName.trim();
    const loginEmail =
      existing || name.length < 2
        ? undefined
        : await uniqueStaffEmail(name, venue.slug, (email) => this.repo.emailTaken(email));

    return {
      loginEmail,
      phoneBelongsToExistingAccount: Boolean(existing),
      alreadyOnStaff: Boolean(seat),
      existingRole: seat?.role,
      existingStatus: seat?.status,
    };
  }

  async create(input: CreateVenueStaffInput, actorId: string): Promise<CreateVenueStaffResult> {
    const venue = await this.requireVenue(input.venueId);
    this.assertAssignableRole(input.role);

    const phone = normalisePhoneOrThrow(input.phoneNumber);
    const fullName = input.fullName.trim();
    const existing = await this.repo.findUserByPhone(phone);

    if (existing) {
      const seat = await this.attachExisting(input, existing.id, venue.primaryOwnerId, actorId);
      return seat;
    }

    const email = await uniqueStaffEmail(fullName, venue.slug, (candidate) =>
      this.repo.emailTaken(candidate),
    );
    const password = input.password?.trim() || generateStarterPassword();
    assertPasswordStrength(password, { fullName, phoneNumber: phone, email });

    // Hashed outside the transaction — argon2 is slow by design.
    const passwordHash = await argon2.hash(password, { type: argon2.argon2id });
    const seat = await this.repo.createProvisionedSeat({
      venueId: input.venueId,
      fullName,
      phoneNumber: phone,
      email,
      passwordHash,
      role: input.role,
      invitedById: actorId,
    });

    await this.applyPreset(seat.userId, input.venueId, input.role, actorId);

    this.logger.log(`staff created: ${seat.id} (${input.role}) at ${input.venueId} by ${actorId}`);
    return {
      member: mapSeat(
        seat,
        actorId,
        await this.permissionsFor(seat.userId, input.venueId),
        venue.primaryOwnerId,
      ),
      outcome: StaffCreateOutcome.CREATED_ACCOUNT,
      credentials: { loginEmail: email, password },
    };
  }

  /**
   * Give an account that already exists a seat here.
   *
   * Two rules carry the weight. The typed password is discarded without ever
   * reaching the user record — writing it would be a complete takeover of a
   * stranger's Arena NP account by anyone who can guess their mobile number.
   * And their name, email and verification state are left exactly as they are:
   * this venue is gaining a colleague, not editing a person.
   */
  private async attachExisting(
    input: CreateVenueStaffInput,
    userId: string,
    primaryOwnerId: string,
    actorId: string,
  ): Promise<CreateVenueStaffResult> {
    if (userId === actorId) {
      throw new BadRequestException("That's your own number — you already have a seat here.");
    }

    const user = await this.repo.findUserByPhone(normalisePhoneOrThrow(input.phoneNumber));
    if (!user) throw new NotFoundException('Account not found.');
    if (user.role === UserRole.SUPER_ADMIN) {
      throw new ForbiddenException('That account cannot be added as venue staff.');
    }
    if (!user.isActive) {
      throw new BadRequestException('That account has been deactivated platform-wide.');
    }
    if (userId === primaryOwnerId) {
      throw new BadRequestException(
        'That is the venue owner — they already hold every permission.',
      );
    }

    const seat = await this.repo.findSeatForUser(input.venueId, userId);
    if (seat) {
      if (seat.status === MembershipStatus.SUSPENDED) {
        if (!input.reactivate) {
          throw new ConflictException(
            'That person already has a suspended seat here. Reactivate it instead of adding them again.',
          );
        }
        const reactivated = await this.repo.updateSeat(seat.id, {
          status: MembershipStatus.ACTIVE,
          role: input.role,
        });
        await this.applyPreset(reactivated.userId, input.venueId, input.role, actorId);

        this.logger.log(`staff reactivated: ${seat.id} at ${input.venueId} by ${actorId}`);
        return {
          member: mapSeat(
            reactivated,
            actorId,
            await this.permissionsFor(reactivated.userId, input.venueId),
            primaryOwnerId,
          ),
          outcome: StaffCreateOutcome.REACTIVATED,
        };
      }
      throw new ConflictException('That person is already on your staff.');
    }

    if (!input.attachExistingConfirmed) {
      throw new ConflictException(
        'This number already has an Arena NP account. Confirm to give that account access to your venue — they will sign in with their own password.',
      );
    }

    const created = await this.repo.attachSeat({
      venueId: input.venueId,
      userId,
      role: input.role,
      invitedById: actorId,
    });
    await this.applyPreset(created.userId, input.venueId, input.role, actorId);

    this.logger.log(
      `staff attached: ${created.id} (${input.role}) at ${input.venueId} by ${actorId}`,
    );
    return {
      member: mapSeat(
        created,
        actorId,
        await this.permissionsFor(created.userId, input.venueId),
        primaryOwnerId,
      ),
      outcome: StaffCreateOutcome.ATTACHED_EXISTING,
    };
  }

  async update(input: UpdateVenueStaffInput, actorId: string): Promise<VenueStaffMember> {
    const venue = await this.requireVenue(input.venueId);
    const seat = await this.requireSeat(input.venueId, input.membershipId);

    if (input.role && input.role !== seat.role) {
      this.assertAssignableRole(input.role);
      await this.assertNotSelf(seat, actorId, "You can't change your own role.");
      await this.assertNotLastOwner(seat, venue.primaryOwnerId, 'demoted');
      const updated = await this.repo.updateSeat(seat.id, { role: input.role });
      await this.applyPreset(updated.userId, input.venueId, input.role, actorId);
      this.logger.log(
        `staff role: ${seat.id} ${seat.role} → ${input.role} at ${input.venueId} by ${actorId}`,
      );
      return mapSeat(
        updated,
        actorId,
        await this.permissionsFor(updated.userId, input.venueId),
        venue.primaryOwnerId,
      );
    }

    return mapSeat(
      seat,
      actorId,
      await this.permissionsFor(seat.userId, input.venueId),
      venue.primaryOwnerId,
    );
  }

  async setStatus(input: SetVenueStaffStatusInput, actorId: string): Promise<VenueStaffMember> {
    if (input.status === MembershipStatus.INVITED) {
      throw new BadRequestException('A seat can only be made active or suspended.');
    }
    const venue = await this.requireVenue(input.venueId);
    const seat = await this.requireSeat(input.venueId, input.membershipId);

    await this.assertNotSelf(seat, actorId, "You can't suspend your own seat.");
    if (input.status === MembershipStatus.SUSPENDED) {
      await this.assertNotLastOwner(seat, venue.primaryOwnerId, 'suspended');
    }

    // No tokenVersion bump. Membership is read live on every request, so this
    // takes effect on their next call anyway — and bumping it would also sign
    // them out of their personal player account and any OTHER venue they work
    // at, which is not this venue's decision to make.
    const updated = await this.repo.updateSeat(seat.id, { status: input.status });
    this.logger.log(`staff status: ${seat.id} → ${input.status} at ${input.venueId} by ${actorId}`);
    return mapSeat(
      updated,
      actorId,
      await this.permissionsFor(updated.userId, input.venueId),
      venue.primaryOwnerId,
    );
  }

  /**
   * Take the seat away.
   *
   * Their history stays: `Booking.createdById` and friends point at the User,
   * which this never deletes, so "booked by Ram" still reads as Ram long after
   * Ram has left.
   *
   * A login the venue minted is retired at the same time, but only if it has
   * no seats left anywhere — otherwise a removed staff member keeps working
   * credentials, lands on a console with no venues, and is invited to create
   * one of their own.
   */
  async remove(input: RemoveVenueStaffInput, actorId: string): Promise<boolean> {
    const venue = await this.requireVenue(input.venueId);
    const seat = await this.requireSeat(input.venueId, input.membershipId);

    await this.assertNotSelf(seat, actorId, "You can't remove your own seat.");
    await this.assertNotLastOwner(seat, venue.primaryOwnerId, 'removed');

    await this.repo.deleteSeat(seat.id);

    if (seat.provisionedUser && (await this.repo.countSeatsForUser(seat.userId)) === 0) {
      await this.repo.deactivateUser(seat.userId);
      await this.auth.invalidateSessions(seat.userId, 'venue staff seat removed');
    }

    this.logger.log(`staff removed: ${seat.id} at ${input.venueId} by ${actorId}`);
    return true;
  }

  /**
   * Issue a fresh starter password.
   *
   * Only ever for a login this venue minted. A personal account's password is
   * its owner's business — they recover it through the normal forgotten-password
   * flow on their own phone.
   */
  async resetPassword(
    input: ResetVenueStaffPasswordInput,
    actorId: string,
  ): Promise<StaffCredentials> {
    const venue = await this.requireVenue(input.venueId);
    const seat = await this.requireSeat(input.venueId, input.membershipId);

    if (!seat.provisionedUser || !seat.user.email) {
      throw new BadRequestException(
        'That person signs in with their own Arena NP account. They can reset it themselves from the login screen.',
      );
    }
    if (seat.userId === actorId) {
      throw new BadRequestException('Change your own password from your account screen.');
    }

    const password = input.password?.trim() || generateStarterPassword();
    assertPasswordStrength(password, {
      fullName: seat.user.fullName,
      phoneNumber: seat.user.phoneNumber,
      email: seat.user.email,
    });

    await this.repo.setPassword(
      seat.userId,
      await argon2.hash(password, { type: argon2.argon2id }),
    );
    await this.auth.invalidateSessions(seat.userId, 'staff password reset by venue');

    this.logger.log(`staff password reset: ${seat.id} at ${venue.id} by ${actorId}`);
    return { loginEmail: seat.user.email, password };
  }

  /** The email domain this venue's logins live under — shown in the form. */
  async loginDomain(venueId: string): Promise<string> {
    const venue = await this.requireVenue(venueId);
    return staffEmailDomain(venue.slug);
  }

  // ─── Guards shared by the mutations ─────────────────────────────────────────

  private async requireVenue(venueId: string) {
    const venue = await this.repo.venueForStaff(venueId);
    if (!venue) throw new NotFoundException('Venue not found.');
    return venue;
  }

  private async requireSeat(venueId: string, membershipId: string): Promise<StaffSeat> {
    const seat = await this.repo.findSeat(venueId, membershipId);
    if (!seat) throw new NotFoundException('That person is not on this venue’s staff.');
    return seat;
  }

  private assertAssignableRole(role: VenueMemberRole): void {
    if (!ASSIGNABLE_ROLES.includes(role)) {
      throw new BadRequestException(
        'Owners are not added from the staff screen. Ask support to add a co-owner.',
      );
    }
  }

  private assertNotSelf(seat: StaffSeat, actorId: string, message: string): void {
    if (seat.userId === actorId) throw new BadRequestException(message);
  }

  /**
   * A venue must always have one active owner, and the primary owner is never
   * one of the removable ones.
   *
   * This lives here rather than in the guard on purpose: `VenuePermissionGuard`
   * returns true for SUPER_ADMIN before it ever looks at a membership, so the
   * same rule expressed there would be bypassable by a platform admin.
   */
  private async assertNotLastOwner(
    seat: StaffSeat,
    primaryOwnerId: string,
    verb: string,
  ): Promise<void> {
    if (seat.userId === primaryOwnerId) {
      throw new BadRequestException(`The venue’s owner cannot be ${verb}.`);
    }
    if (seat.role !== VenueMemberRole.OWNER) return;
    if ((await this.repo.countActiveOwners(seat.venueId)) <= 1) {
      throw new BadRequestException(
        `A venue must always have at least one active owner, so this one cannot be ${verb}.`,
      );
    }
  }
}

function mapSeat(
  seat: StaffSeat,
  actorId: string,
  permissions: string[],
  primaryOwnerId?: string,
): VenueStaffMember {
  return {
    membershipId: seat.id,
    userId: seat.userId,
    fullName: seat.user.fullName ?? undefined,
    phoneNumber: seat.user.phoneNumber,
    role: seat.role,
    status: seat.status,
    permissions,
    // A personal account's address is that person's, not the venue's.
    loginEmail: seat.provisionedUser ? (seat.user.email ?? undefined) : undefined,
    provisionedUser: seat.provisionedUser,
    mustChangePassword: seat.user.mustChangePassword,
    isSelf: seat.userId === actorId,
    isPrimaryOwner: seat.userId === primaryOwnerId,
    payBasis: seat.payBasis ?? undefined,
    payRate: seat.payRate ? Number(seat.payRate.toString()) : undefined,
    lastLoginAt: seat.user.lastLoginAt ?? undefined,
    createdAt: seat.createdAt,
  };
}

function normalisePhoneOrThrow(raw: string): string {
  try {
    return normaliseNepalPhone(raw);
  } catch {
    throw new BadRequestException('Enter a valid 10-digit Nepali mobile number.');
  }
}

/** Preview runs on half-typed input, so an unparseable number is not an error. */
function tryNormalisePhone(raw: string | undefined): string | null {
  if (!raw) return null;
  try {
    return normaliseNepalPhone(raw);
  } catch {
    return null;
  }
}
