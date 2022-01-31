import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'src/decorators/user.decorator';
import { JwtUserPayload } from 'src/modules/auth/entities/jwtPayload.entity';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { UsersService } from '../services/users.service';

@ApiTags('users')
@ApiBearerAuth()
@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@User() jwtUser: JwtUserPayload) {
    return this.usersService.findProfile(jwtUser.userId);
  }
}
