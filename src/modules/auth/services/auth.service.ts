import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { isString } from 'class-validator';
import { UsersService } from 'src/modules/users/services/users.service';
import { JwtUserPayload } from '../dto/jwtPayload.dto';
import { UserLoginDto } from '../dto/userLogin.dto';
import { UserRegisterDto } from '../dto/userRegister.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.usersService.findOneByUsername(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
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

  async register(userRegisterDto: UserRegisterDto) {
    const { password: unhashedPassword, ...userWithoutPassword } =
      userRegisterDto;
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(unhashedPassword, salt);

    const user = await this.usersService.create({
      password,
      ...userWithoutPassword,
    });
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
