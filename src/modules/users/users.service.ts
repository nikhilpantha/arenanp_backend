import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersRepository } from './users.repository';
import { UpdateProfileInput } from './dto/update-profile.input';

@Injectable()
export class UsersService {
  constructor(private readonly users: UsersRepository) {}

  async findById(id: string): Promise<User> {
    const user = await this.users.findById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateProfile(userId: string, input: UpdateProfileInput): Promise<User> {
    if (input.email) {
      const existing = await this.users.findByEmail(input.email);
      if (existing && existing.id !== userId) {
        throw new ConflictException('Email is already in use');
      }
    }
    return this.users.update(userId, {
      fullName: input.fullName ?? undefined,
      email: input.email ?? undefined,
      avatarUrl: input.avatarUrl ?? undefined,
    });
  }
}
