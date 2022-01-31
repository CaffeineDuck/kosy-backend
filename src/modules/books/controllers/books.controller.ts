import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Book } from '@prisma/client';
import { FingerPrint } from 'src/decorators/fingerprint.decorator';
import { User } from 'src/decorators/user.decorator';
import { JwtUserPayload } from 'src/modules/auth/entities/jwtPayload.entity';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { PartialBook } from '../entities/partial-book.entity';
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
  ): Promise<PartialBook[]> {
    return this.booksService.latest(skip, take);
  }

  @ApiQuery({ name: 'take', required: false })
  @ApiQuery({ name: 'skip', required: false })
  @Get('top')
  async topBooks(
    @Query('take') take: string,
    @Query('skip') skip: string,
  ): Promise<PartialBook[]> {
    return this.booksService.top(skip, take);
  }

  @ApiHeader({ name: 'fingerPrint' })
  @Get(':id')
  async getBook(
    @Param('id') id: string,
    @FingerPrint() fingerPrint?: string,
  ): Promise<Book> {
    await this.booksService.handleViews(+id, fingerPrint);
    return this.booksService.findOnePublished(+id);
  }

  @Get('search')
  async search(@Query('q') query: string): Promise<PartialBook[]> {
    return this.booksService.search(query);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post(':id/save')
  async saveBook(@Param('id') id: string, @User() userJwt: JwtUserPayload) {
    return this.booksService.saveBook(userJwt.userId, +id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id/save')
  async unSaveBook(@Param('id') id: string, @User() userJwt: JwtUserPayload) {
    return this.booksService.unSaveBook(userJwt.userId, +id);
  }
}
