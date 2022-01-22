import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { isString } from 'class-validator';
import { UsersService } from 'src/modules/users/services/users.service';
import { JwtUserPayload } from '../dto/jwtPayload.dto';
import { UserLoginDto } from '../dto/userLogin.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.usersService.findOneByUsername(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
  }

  async login(userLoginDto: UserLoginDto) {
    const user = await this.usersService.findOneByUsername(
      userLoginDto.username,
    );
    const payload: JwtUserPayload = {
      username: user.username,
      userId: user.id,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
