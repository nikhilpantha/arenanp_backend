import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import type { AuthUser } from '../../../common/types/auth-context';
import { StorageService } from '../../../storage/storage.service';
import { AdminSportsRepository } from './admin-sports.repository';
import { AdminSport, mapSportToAdmin } from './dto/admin-sport.model';
import { CreateSportInput, UpdateSportInput } from './dto/sport.inputs';

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

    const row = await this.repo.create({
      slug,
      name: input.name.trim(),
      iconUrl: input.iconUrl?.trim() || null,
      description: input.description?.trim() || null,
      features: normaliseFeatures(input.features),
      slotDurations: normaliseSlotDurations(input.slotDurations),
      displayOrder: input.displayOrder ?? 0,
      isActive: input.isActive ?? true,
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

    const updated = await this.repo.update({
      id: input.id,
      data: {
        slug: input.slug ?? undefined,
        name: input.name?.trim() ?? undefined,
        iconUrl: nextIcon,
        description:
          input.description === undefined ? undefined : input.description?.trim() || null,
        features: input.features === undefined ? undefined : normaliseFeatures(input.features),
        slotDurations:
          input.slotDurations === undefined
            ? undefined
            : normaliseSlotDurations(input.slotDurations),
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

/** Trim, drop blanks, and de-duplicate (case-insensitive) the amenity presets. */
function normaliseFeatures(features?: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of features ?? []) {
    const value = raw.trim();
    const key = value.toLowerCase();
    if (value && !seen.has(key)) {
      seen.add(key);
      out.push(value);
    }
  }
  return out;
}

/** Default slot lengths when an admin clears the list — the app needs at least one option. */
const DEFAULT_SLOT_DURATIONS = [30, 60, 90, 120];

/** Keep positive whole minutes, de-duplicate, and sort ascending; fall back to defaults. */
function normaliseSlotDurations(durations?: number[]): number[] {
  const cleaned = Array.from(
    new Set((durations ?? []).filter((d) => Number.isInteger(d) && d > 0)),
  ).sort((a, b) => a - b);
  return cleaned.length ? cleaned : DEFAULT_SLOT_DURATIONS;
}
