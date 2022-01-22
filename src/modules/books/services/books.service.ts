import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createBookDto: CreateBookDto, sellerId: number) {
    return this.prismaService.book.create({
      data: { ...createBookDto, seller: { connect: { id: sellerId } } },
    });
  }

  async findAll(userId: number) {
    return this.prismaService.book.findMany({
      where: { seller: { id: userId } },
    });
  }

  async findOne(id: number, userId: number) {
    return this.prismaService.book.findFirst({
      where: { id, seller: { id: userId } },
    });
  }

  async update(id: number, updateBookDto: UpdateBookDto, userId: number) {
    const book = await this.prismaService.book.findUnique({ where: { id } });

    if (book.sellerId != userId) {
      throw new ForbiddenException('You are not the seller of this book');
    }

    return this.prismaService.book.update({
      where: { id },
      data: updateBookDto,
    });
  }

  async remove(id: number, userId: number) {
    const book = await this.prismaService.book.findUnique({ where: { id } });

    if (book.sellerId != userId) {
      throw new ForbiddenException('You are not the seller of this book');
    }

    return this.prismaService.book.delete({ where: { id } });
  }
}
