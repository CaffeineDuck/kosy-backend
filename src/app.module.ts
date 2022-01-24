import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { BooksModule } from './modules/books/books.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { RedisModule } from 'nestjs-redis';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [config], isGlobal: true, envFilePath: ['.env'] }),
    PrismaModule,
    RedisModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.get('REDIS'),
    }),
    BooksModule,
    AuthModule,
    UsersModule,
  ],
  providers: [],
})
export class AppModule {}
