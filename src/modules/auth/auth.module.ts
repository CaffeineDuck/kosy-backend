import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './stratigies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './stratigies/jwt.strategy';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.get('JWT'),
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
