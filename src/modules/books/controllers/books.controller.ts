import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from '../services/books.service';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { Book } from '@prisma/client';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'src/decorators/user.decorator';
import { JwtUserPayload } from 'src/modules/auth/dto/jwtPayload.dto';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';

@ApiTags('books')
@ApiBearerAuth()
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createBookDto: CreateBookDto,
    @User() userPayload: JwtUserPayload,
  ): Promise<Book> {
    return this.booksService.create(createBookDto, userPayload.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@User() userPayload: JwtUserPayload): Promise<Book[]> {
    return this.booksService.findAll(userPayload.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @User() userPayload: JwtUserPayload,
  ): Promise<Book> {
    return this.booksService.findOne(+id, userPayload.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
    @User() userPayload: JwtUserPayload,
  ): Promise<Book> {
    return this.booksService.update(+id, updateBookDto, userPayload.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @User() userPayload: JwtUserPayload,
  ): Promise<Book> {
    return this.booksService.remove(+id, userPayload.userId);
  }
}
