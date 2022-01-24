import { Module } from '@nestjs/common';
import { BooksService } from './services/books.service';
import { UserBooksController } from './controllers/userBooks.controller';
import { BooksController } from './controllers/books.controller';
import { CommentController } from './controllers/comments.controller';
import { CommentService } from './services/comments.service';

@Module({
  controllers: [BooksController, UserBooksController, CommentController],
  providers: [BooksService, CommentService],
})
export class BooksModule {}
