import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id }, include: { capabilities: true } });
  }

  findByPhone(phoneNumber: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { phoneNumber } });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({ where: { id }, data, include: { capabilities: true } });
  }
}
