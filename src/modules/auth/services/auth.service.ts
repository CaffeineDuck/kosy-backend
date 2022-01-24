import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UsersService } from 'src/modules/users/services/users.service';
import { JwtUserPayload } from '../dto/jwtPayload.dto';
import { UserLoginDto } from '../dto/userLogin.dto';
import { UserRegisterDto } from '../dto/userRegister.dto';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { refreshPayloadDto } from '../dto/refreshPayload.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.usersService.findOneByUsername(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
  }

  async genAccessToken(user: User) {
    const payload = {
      username: user.username,
      userId: user.id,
      role: user.role,
    };
    const accessToken = await this.jwtService.signAsync(payload);
    return {
      access_token: accessToken,
    };
  }

  async genRefreshToken(user: User) {
    const payload = {
      userId: user.id,
      version: user.tokenVersion,
    };
    return await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRY'),
    });
  }

  async login(res: Response, userLoginDto: UserLoginDto) {
    const user = await this.usersService.findOneByUsername(
      userLoginDto.username,
    );

    const refreshToken = await this.genRefreshToken(user);
    res.cookie('jid', refreshToken, { httpOnly: true });

    return this.genAccessToken(user);
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

  async refreshTokenHandler(req: Request, res: Response) {
    const cookie = req.cookies.jid;
    if (!cookie) {
      throw new UnauthorizedException();
    }

    try {
      await this.jwtService.verifyAsync(cookie);
    } catch (err) {
      throw new UnauthorizedException();
    }

    const parsedRefreshToken = this.jwtService.decode(
      cookie,
    ) as refreshPayloadDto;
    const user = await this.usersService.findOneById(parsedRefreshToken.userId);

    if (parsedRefreshToken.version != user.tokenVersion) {
      throw new UnauthorizedException();
    }

    const refreshToken = await this.genRefreshToken(user);
    res.cookie('jid', refreshToken, { httpOnly: true });

    return this.genAccessToken(user);
  }
}
