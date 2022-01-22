import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { BooksModule } from './modules/books/books.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [PrismaModule, BooksModule, AuthModule, UsersModule],
  providers: [],
})
export class AppModule {}
