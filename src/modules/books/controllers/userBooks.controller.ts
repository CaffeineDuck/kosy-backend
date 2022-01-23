import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { BooksService } from '../services/books.service';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { Book } from '@prisma/client';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'src/decorators/user.decorator';
import { JwtUserPayload } from 'src/modules/auth/dto/jwtPayload.dto';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { PartialBookDto } from '../dto/partial-book.dto';

@ApiTags('user books')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('user-books')
export class UserBooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  async create(
    @Body() createBookDto: CreateBookDto,
    @User() userPayload: JwtUserPayload,
  ): Promise<Book> {
    return this.booksService.create(createBookDto, userPayload.userId);
  }

  @Get()
  async findAll(
    @User() userPayload: JwtUserPayload,
  ): Promise<PartialBookDto[]> {
    return this.booksService.findAllUserBooks(userPayload.userId);
  }

  @Get('drafts')
  async findAllDrafts(@User() userPayload: JwtUserPayload): Promise<PartialBookDto[]> {
    return this.booksService.findAllUserDrafts(userPayload.userId)
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @User() userPayload: JwtUserPayload,
  ): Promise<Book> {
    const book = await this.booksService.verifyUserBook(
      +id,
      userPayload.userId,
    );
    return book;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
    @User() userPayload: JwtUserPayload,
  ): Promise<Book> {
    await this.booksService.verifyUserBook(+id, userPayload.userId);
    return this.booksService.update(+id, updateBookDto);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @User() userPayload: JwtUserPayload,
  ): Promise<Book> {
    await this.booksService.verifyUserBook(+id, userPayload.userId);
    return this.booksService.remove(+id);
  }

  @Get('search')
  async search(@Query('q') query: string, @User() userPayload: JwtUserPayload) {
    return this.booksService.searchUserBooks(query, userPayload.userId);
  }
}
