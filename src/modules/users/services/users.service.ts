import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async findOne(data: { username?: string; id?: number }): Promise<User> {
    const { username, id } = data;
    if (!username && !id) {
      throw new Error('You must provide either username or id');
    }
    return this.prismaService.user.findUnique({ where: data });
  }

  async fineOneWithoutPassword(data: { username?: string; id?: number }) {
    const user = await this.findOne(data);
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
