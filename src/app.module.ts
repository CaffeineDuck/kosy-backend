import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { BooksModule } from './modules/books/books.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { RedisModule } from 'nestjs-redis';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UploadsModule } from './modules/uploads/uploads.module';
import config from './config';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    PrismaModule,
    RedisModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.get('REDIS'),
    }),
    ScheduleModule.forRoot(),
    BooksModule,
    AuthModule,
    UsersModule,
    UploadsModule,
  ],
  providers: [],
})
export class AppModule {}
