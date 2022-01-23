import { Test, TestingModule } from '@nestjs/testing';
import { UserBooksController } from './userBooks.controller';
import { BooksService } from '../services/books.service';

describe('BooksController', () => {
  let controller: UserBooksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserBooksController],
      providers: [BooksService],
    }).compile();

    controller = module.get<UserBooksController>(UserBooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
