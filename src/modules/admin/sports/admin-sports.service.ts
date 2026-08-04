import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { SportBookingMode, SportPricingUnit } from '@prisma/client';

import type { AuthUser } from '../../../common/types/auth-context';
import { StorageService } from '../../../storage/storage.service';
import { AdminSportsRepository } from './admin-sports.repository';
import { AdminSport, mapSportToAdmin } from './dto/admin-sport.model';
import { CreateSportInput, UpdateSportInput } from './dto/sport.inputs';
import {
  assertSportConfig,
  deriveFeatures,
  normaliseSlotDurations,
  normaliseTags,
  patch,
} from './sport-rules';

@Injectable()
export class AdminSportsService {
  constructor(
    private readonly repo: AdminSportsRepository,
    private readonly storage: StorageService,
  ) {}

  async list(activeOnly: boolean): Promise<AdminSport[]> {
    const rows = await this.repo.list({ activeOnly });
    return rows.map(mapSportToAdmin);
  }

  async getOne(id: string): Promise<AdminSport> {
    const row = await this.repo.findById(id);
    if (!row) throw new NotFoundException('Sport not found.');
    return mapSportToAdmin(row);
  }

  async create(input: CreateSportInput, actor: AuthUser): Promise<AdminSport> {
    const slug = input.slug?.trim() || this.slugify(input.name);
    if (!slug) throw new BadRequestException('Could not derive a slug from the name.');

    const clash = await this.repo.findBySlug(slug);
    if (clash) {
      throw new ConflictException(`A sport with slug "${slug}" already exists.`);
    }

    const name = input.name.trim();
    const surfaces = normaliseTags(input.surfaces);
    const formats = normaliseTags(input.formats);
    const courtFeatures = normaliseTags(input.courtFeatures);
    const slotDurations = normaliseSlotDurations(input.slotDurations);
    const isActive = input.isActive ?? true;

    assertSportConfig({
      name,
      isActive,
      slotDurations,
      defaultSlotMinutes: input.defaultSlotMinutes ?? 60,
      minDurationMinutes: input.minDurationMinutes ?? null,
      maxDurationMinutes: input.maxDurationMinutes ?? null,
      bookingMode: input.bookingMode ?? SportBookingMode.EXCLUSIVE,
      defaultCapacity: input.defaultCapacity ?? null,
      unitLabel: input.unitLabel ?? 'court',
      unitLabelPlural: input.unitLabelPlural ?? 'courts',
    });

    const row = await this.repo.create({
      slug,
      name,
      iconUrl: input.iconUrl?.trim() || null,
      description: input.description?.trim() || null,

      pricingUnit: input.pricingUnit ?? SportPricingUnit.PER_HOUR,
      unitLabel: (input.unitLabel ?? 'court').trim(),
      unitLabelPlural: (input.unitLabelPlural ?? 'courts').trim(),
      slotDurations,
      defaultSlotMinutes: input.defaultSlotMinutes ?? 60,
      minDurationMinutes: input.minDurationMinutes ?? null,
      maxDurationMinutes: input.maxDurationMinutes ?? null,
      bookingMode: input.bookingMode ?? SportBookingMode.EXCLUSIVE,
      defaultCapacity: input.defaultCapacity ?? null,

      surfaces,
      formats,
      courtFeatures,
      // Derived, never authored — see sport-rules.deriveFeatures.
      features: deriveFeatures({ surfaces, formats, courtFeatures }),

      displayOrder: input.displayOrder ?? 0,
      isActive,
      createdById: actor.id,
    });
    return mapSportToAdmin(row);
  }

  async update(input: UpdateSportInput): Promise<AdminSport> {
    const existing = await this.repo.findById(input.id);
    if (!existing) throw new NotFoundException('Sport not found.');

    if (input.slug && input.slug !== existing.slug) {
      const clash = await this.repo.findBySlug(input.slug);
      if (clash && clash.id !== existing.id) {
        throw new ConflictException(`A sport with slug "${input.slug}" already exists.`);
      }
    }

    const nextIcon = input.iconUrl === undefined ? undefined : input.iconUrl?.trim() || null;

    // Validate the sport as it will be *after* the patch, not the patch alone —
    // narrowing slotDurations can invalidate a default slot the admin never
    // touched, and that has to be caught before it reaches an owner's screen.
    const surfaces =
      input.surfaces === undefined ? existing.surfaces : normaliseTags(input.surfaces);
    const formats = input.formats === undefined ? existing.formats : normaliseTags(input.formats);
    const courtFeatures =
      input.courtFeatures === undefined
        ? existing.courtFeatures
        : normaliseTags(input.courtFeatures);
    const slotDurations =
      input.slotDurations === undefined
        ? existing.slotDurations
        : normaliseSlotDurations(input.slotDurations);
    const catalogueChanged =
      input.surfaces !== undefined ||
      input.formats !== undefined ||
      input.courtFeatures !== undefined;

    assertSportConfig({
      name: input.name?.trim() ?? existing.name,
      isActive: input.isActive ?? existing.isActive,
      slotDurations,
      defaultSlotMinutes: input.defaultSlotMinutes ?? existing.defaultSlotMinutes,
      minDurationMinutes: patch(input.minDurationMinutes, existing.minDurationMinutes),
      maxDurationMinutes: patch(input.maxDurationMinutes, existing.maxDurationMinutes),
      bookingMode: input.bookingMode ?? existing.bookingMode,
      defaultCapacity: patch(input.defaultCapacity, existing.defaultCapacity),
      unitLabel: input.unitLabel ?? existing.unitLabel,
      unitLabelPlural: input.unitLabelPlural ?? existing.unitLabelPlural,
    });

    const updated = await this.repo.update({
      id: input.id,
      data: {
        slug: input.slug ?? undefined,
        name: input.name?.trim() ?? undefined,
        iconUrl: nextIcon,
        description:
          input.description === undefined ? undefined : input.description?.trim() || null,

        pricingUnit: input.pricingUnit ?? undefined,
        unitLabel: input.unitLabel?.trim() ?? undefined,
        unitLabelPlural: input.unitLabelPlural?.trim() ?? undefined,
        slotDurations: input.slotDurations === undefined ? undefined : slotDurations,
        defaultSlotMinutes: input.defaultSlotMinutes ?? undefined,
        // Pass nullable numerics straight through: `undefined` means "leave it",
        // an explicit `null` clears it. Collapsing the two would make these
        // fields permanent once set.
        minDurationMinutes: input.minDurationMinutes,
        maxDurationMinutes: input.maxDurationMinutes,
        bookingMode: input.bookingMode ?? undefined,
        defaultCapacity: input.defaultCapacity,

        surfaces: input.surfaces === undefined ? undefined : surfaces,
        formats: input.formats === undefined ? undefined : formats,
        courtFeatures: input.courtFeatures === undefined ? undefined : courtFeatures,
        // Keep the deprecated flat list in step with its three sources.
        features: catalogueChanged
          ? deriveFeatures({ surfaces, formats, courtFeatures })
          : undefined,

        displayOrder: input.displayOrder ?? undefined,
        isActive: input.isActive ?? undefined,
      },
    });

    // Clean up the previous icon object if it was replaced or cleared.
    if (nextIcon !== undefined && existing.iconUrl && existing.iconUrl !== nextIcon) {
      await this.storage.deleteMany([existing.iconUrl]);
    }
    return mapSportToAdmin(updated);
  }

  /**
   * Delete is only allowed when nothing references the sport. Most of the time
   * admins should toggle `isActive` instead — `delete` is the nuclear option.
   */
  async delete(id: string): Promise<boolean> {
    const existing = await this.repo.findById(id);
    if (!existing) throw new NotFoundException('Sport not found.');

    const refs = await this.repo.countReferences(id);
    const total = refs.courts + refs.tournaments + refs.venues;
    if (total > 0) {
      throw new BadRequestException(
        `Cannot delete "${existing.name}" — it's still used by ${refs.courts} court(s), ${refs.tournaments} tournament(s), and ${refs.venues} venue offering(s). Deactivate it instead.`,
      );
    }
    await this.repo.delete(id);
    await this.storage.deleteMany([existing.iconUrl]);
    return true;
  }

  private slugify(input: string): string {
    return input
      .toLowerCase()
      .trim()
      .replace(/['"]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
}
