import { BadRequestException, Injectable } from '@nestjs/common';

import { ClosuresRepository } from './closures.repository';
import { ClosureModel, mapClosure } from './dto/closure.model';
import type { CreateClosureInput, ListClosuresInput } from './dto/closure.inputs';

@Injectable()
export class ClosuresService {
  constructor(private readonly repo: ClosuresRepository) {}

  async list(input: ListClosuresInput): Promise<ClosureModel[]> {
    const rows = await this.repo.list(input);
    return rows.map(mapClosure);
  }

  async create(input: CreateClosureInput, createdById: string): Promise<ClosureModel> {
    if (input.endAt <= input.startAt) {
      throw new BadRequestException('The block must end after it starts.');
    }
    return mapClosure(await this.repo.create(input, createdById));
  }

  async remove(venueId: string, closureId: string): Promise<ClosureModel> {
    return mapClosure(await this.repo.remove(venueId, closureId));
  }
}
