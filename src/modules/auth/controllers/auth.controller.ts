import {
  Controller,
  Post,
  UseGuards,
  Body,
  Req,
  Res,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { UserLoginDto } from '../dto/userLogin.dto';
import { UserRegisterDto } from '../dto/userRegister.dto';
import { Request, Response } from 'express';
import { User } from 'src/decorators/user.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { JwtUserPayload } from '../dto/jwtPayload.dto';

@ApiTags('authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Body() user: UserLoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.login(res, user);
  }

  @Post('register')
  async register(@Body() user: UserRegisterDto) {
    return this.authService.register(user);
  }

  @Post('refresh-token')
  async refreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.refreshTokenHandler(req, res);
  }
}
