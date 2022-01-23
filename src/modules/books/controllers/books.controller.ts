import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Book } from '@prisma/client';
import { PartialBookDto } from '../dto/partial-book.dto';
import { BooksService } from '../services/books.service';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @ApiQuery({ name: 'take', required: false })
  @ApiQuery({ name: 'skip', required: false })
  @Get('latest')
  async latestBooks(
    @Query('take') take: string,
    @Query('skip') skip: string,
  ): Promise<PartialBookDto[]> {
    return this.booksService.latest(skip, take);
  }

  @ApiQuery({ name: 'take', required: false })
  @ApiQuery({ name: 'skip', required: false })
  @Get('top')
  async topBooks(
    @Query('take') take: string,
    @Query('skip') skip: string,
  ): Promise<PartialBookDto[]> {
    return this.booksService.top(skip, take);
  }

  @Get('book/:id')
  async getBook(@Param('id') id: string): Promise<Book> {
    return this.booksService.findOnePublished(+id);
  }

  @Get('search')
  async search(@Query('q') query: string): Promise<PartialBookDto[]> {
    return this.booksService.search(query);
  }
}
