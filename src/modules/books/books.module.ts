import { Module } from '@nestjs/common';
import { BooksService } from './services/books.service';
import { UserBooksController } from './controllers/userBooks.controller';
import { BooksController } from './controllers/books.controller';

@Module({
  controllers: [BooksController, UserBooksController],
  providers: [BooksService],
})
export class BooksModule {}
