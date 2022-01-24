import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiHeader, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Book } from '@prisma/client';
import { FingerPrint } from 'src/decorators/fingerprint.decorator';
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

  @ApiHeader({name: 'fingerPrint'})
  @Get('book/:id')
  async getBook(
    @Param('id') id: string,
    @FingerPrint() fingerPrint?: string,
  ): Promise<Book> {
    await this.booksService.handleViews(+id, fingerPrint)
    return this.booksService.findOnePublished(+id);
  }

  @Get('search')
  async search(@Query('q') query: string): Promise<PartialBookDto[]> {
    return this.booksService.search(query);
  }
}
