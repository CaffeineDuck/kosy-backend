import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async findOneByUsername(username: string): Promise<User> {
    return this.prismaService.user.findUnique({ where: { username } });
  }

  async findOneById(id: number): Promise<User> {
    return this.prismaService.user.findUnique({ where: { id } });
  }

  async fineOneWithoutPassword(id: number) {
    const user = await this.findOneById(id);
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
