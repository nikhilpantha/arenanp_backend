import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import type { AuthUser } from '../../../common/types/auth-context';
import { AdminSportsRepository } from './admin-sports.repository';
import { AdminSport, mapSportToAdmin } from './dto/admin-sport.model';
import { CreateSportInput, UpdateSportInput } from './dto/sport.inputs';

@Injectable()
export class AdminSportsService {
  constructor(private readonly repo: AdminSportsRepository) {}

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

    const updated = await this.repo.update({
      id: input.id,
      data: {
        slug: input.slug ?? undefined,
        name: input.name?.trim() ?? undefined,
        iconUrl: input.iconUrl === undefined ? undefined : input.iconUrl?.trim() || null,
        description:
          input.description === undefined ? undefined : input.description?.trim() || null,
        displayOrder: input.displayOrder ?? undefined,
        isActive: input.isActive ?? undefined,
      },
    });
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
