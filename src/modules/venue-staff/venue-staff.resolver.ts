import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { RequireVenuePermission } from '../../common/decorators/venue-permission.decorator';
import { VenuePermissionGuard } from '../../common/guards/venue-permission.guard';
import type { AuthUser } from '../../common/types/auth-context';

import {
  CreateVenueStaffInput,
  PreviewStaffLoginInput,
  RemoveVenueStaffInput,
  ResetVenueStaffPasswordInput,
  SetVenueStaffStatusInput,
  UpdateVenueStaffInput,
  VenueStaffActivityInput,
} from './dto/venue-staff.inputs';
import {
  CreateVenueStaffResult,
  StaffCredentials,
  StaffLoginPreview,
  VenueStaffMember,
} from './dto/venue-staff.models';
import { StaffActivity } from './dto/staff-activity.model';
import { StaffActivityService } from './staff-activity.service';
import { VenueStaffService } from './venue-staff.service';

/**
 * Managing who works at a venue. Every operation needs `staff:manage`, which
 * by the role table is the owner's alone — managers are deliberately excluded,
 * because staff and money-out are the two powers an owner will not delegate.
 *
 * The class-level guard covers every method; each still declares the exact
 * permission, since the guard is inert without one.
 */
@Resolver(() => VenueStaffMember)
@UseGuards(VenuePermissionGuard)
export class VenueStaffResolver {
  constructor(
    private readonly service: VenueStaffService,
    private readonly activity: StaffActivityService,
  ) {}

  @Query(() => [VenueStaffMember], {
    name: 'venueStaff',
    description: 'Everyone with a seat at this venue, owners first.',
  })
  @RequireVenuePermission('venue.staff.manage')
  venueStaff(
    @Args('venueId', { type: () => ID }) venueId: string,
    @CurrentUser() actor: AuthUser,
  ): Promise<VenueStaffMember[]> {
    return this.service.list(venueId, actor.id);
  }

  @Query(() => String, {
    name: 'venueStaffLoginDomain',
    description:
      'The email domain this venue\'s staff logins live under, e.g. "lumbini-futsal.arenanp.com".',
  })
  @RequireVenuePermission('venue.staff.manage')
  venueStaffLoginDomain(@Args('venueId', { type: () => ID }) venueId: string): Promise<string> {
    return this.service.loginDomain(venueId);
  }

  @Query(() => StaffLoginPreview, {
    name: 'venueStaffLoginPreview',
    description:
      'What the add-staff form would do as typed: the address that would be minted, and whether this mobile already belongs to someone.',
  })
  @RequireVenuePermission('venue.staff.manage')
  venueStaffLoginPreview(@Args('input') input: PreviewStaffLoginInput): Promise<StaffLoginPreview> {
    return this.service.preview(input);
  }

  @Query(() => StaffActivity, {
    name: 'venueStaffActivity',
    description:
      'What one staff member did over a period — bookings created, cancellations, money taken, cash days closed. Read from columns already written on every action.',
  })
  @RequireVenuePermission('venue.staff.manage')
  venueStaffActivity(@Args('input') input: VenueStaffActivityInput): Promise<StaffActivity> {
    return this.activity.forMember(input);
  }

  @Mutation(() => CreateVenueStaffResult, {
    name: 'createVenueStaff',
    description:
      'Add someone to the staff: mints a login for a new number, or (once confirmed) gives an existing Arena NP account a seat.',
  })
  @RequireVenuePermission('venue.staff.manage')
  createVenueStaff(
    @Args('input') input: CreateVenueStaffInput,
    @CurrentUser() actor: AuthUser,
  ): Promise<CreateVenueStaffResult> {
    return this.service.create(input, actor.id);
  }

  @Mutation(() => VenueStaffMember, {
    name: 'updateVenueStaff',
    description: "Change a staff member's role.",
  })
  @RequireVenuePermission('venue.staff.manage')
  updateVenueStaff(
    @Args('input') input: UpdateVenueStaffInput,
    @CurrentUser() actor: AuthUser,
  ): Promise<VenueStaffMember> {
    return this.service.update(input, actor.id);
  }

  @Mutation(() => VenueStaffMember, {
    name: 'setVenueStaffStatus',
    description: 'Suspend a seat, or switch it back on. Takes effect on their very next request.',
  })
  @RequireVenuePermission('venue.staff.manage')
  setVenueStaffStatus(
    @Args('input') input: SetVenueStaffStatusInput,
    @CurrentUser() actor: AuthUser,
  ): Promise<VenueStaffMember> {
    return this.service.setStatus(input, actor.id);
  }

  @Mutation(() => Boolean, {
    name: 'removeVenueStaff',
    description:
      'Take away the seat. Everything they booked, took payment for or closed keeps their name.',
  })
  @RequireVenuePermission('venue.staff.manage')
  removeVenueStaff(
    @Args('input') input: RemoveVenueStaffInput,
    @CurrentUser() actor: AuthUser,
  ): Promise<boolean> {
    return this.service.remove(input, actor.id);
  }

  @Mutation(() => StaffCredentials, {
    name: 'resetVenueStaffPassword',
    description:
      'Issue a new starter password for a login this venue minted. Shown once. Not available for someone using their own Arena NP account.',
  })
  @RequireVenuePermission('venue.staff.manage')
  resetVenueStaffPassword(
    @Args('input') input: ResetVenueStaffPasswordInput,
    @CurrentUser() actor: AuthUser,
  ): Promise<StaffCredentials> {
    return this.service.resetPassword(input, actor.id);
  }
}
