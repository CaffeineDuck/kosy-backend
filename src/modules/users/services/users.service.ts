import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserRegisterDto } from 'src/modules/auth/dto/userRegister.dto';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

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

  async create(user: UserRegisterDto): Promise<User> {
    const createdUser = await this.prismaService.user.create({
      data: user,
    });
    return createdUser;
  }
}