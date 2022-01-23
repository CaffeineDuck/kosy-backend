import { ForbiddenException, Injectable } from '@nestjs/common';
import { Book } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateBookDto } from '../dto/create-book.dto';
import { PartialBookDto } from '../dto/partial-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';

@Injectable()
export class BooksService {
  FIELDS_FOR_PARTIAL_BOOK = {
    name: true,
    author: true,
    price: true,
    views: true,
  };

  constructor(private readonly prismaService: PrismaService) {}

  async verifyUserBook(id: number, userId: number): Promise<Book> {
    const book = await this.prismaService.book.findUnique({ where: { id } });

    if (book.sellerId != userId) {
      throw new ForbiddenException('You are not the seller of this book');
    }

    return book;
  }

  async findAllUserBooks(userId: number): Promise<PartialBookDto[]> {
    return this.prismaService.book.findMany({
      where: { seller: { id: userId }, published: true },
      select: this.FIELDS_FOR_PARTIAL_BOOK,
    });
  }

  async findAllUserDrafts(userId: number): Promise<PartialBookDto[]> {
    return this.prismaService.book.findMany({
      where: { seller: { id: userId }, published: false },
      select: this.FIELDS_FOR_PARTIAL_BOOK,
    });
  }

  async create(createBookDto: CreateBookDto, sellerId: number) {
    return this.prismaService.book.create({
      data: { ...createBookDto, seller: { connect: { id: sellerId } } },
    });
  }

  async findOne(id: number) {
    return this.prismaService.book.findUnique({
      where: { id },
    });
  }

  async findOnePublished(id: number) {
    return this.prismaService.book.findFirst({
      where: { id, published: true },
    });
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    return this.prismaService.book.update({
      where: { id },
      data: updateBookDto,
    });
  }

  async remove(id: number) {
    return this.prismaService.book.delete({ where: { id } });
  }

  async search(query: string): Promise<PartialBookDto[]> {
    return this.prismaService.book.findMany({
      select: { ...this.FIELDS_FOR_PARTIAL_BOOK },
      where: {
        published: true,
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { author: { startsWith: query, mode: 'insensitive' } },
        ],
      },
    });
  }

  async searchUserBooks(
    query: string,
    userId: number,
  ): Promise<PartialBookDto[]> {
    return this.prismaService.book.findMany({
      select: this.FIELDS_FOR_PARTIAL_BOOK,
      where: {
        sellerId: userId,
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { author: { contains: query, mode: 'insensitive' } },
        ],
      },
    });
  }

  async latest(
    stringSkip: string = '0',
    stringTake: string = '20',
  ): Promise<PartialBookDto[]> {
    const [skip, take] = [+stringSkip, +stringTake];
    return this.prismaService.book.findMany({
      select: this.FIELDS_FOR_PARTIAL_BOOK,
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      take,
      skip,
    });
  }

  async top(
    stringSkip: string = '0',
    stringTake: string = '20',
  ): Promise<PartialBookDto[]> {
    const [skip, take] = [+stringSkip, +stringTake];
    return this.prismaService.book.findMany({
      select: this.FIELDS_FOR_PARTIAL_BOOK,
      where: { published: true },
      orderBy: { views: 'desc' },
      take,
      skip,
    });
  }
}
