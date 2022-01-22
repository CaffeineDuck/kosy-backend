import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createBookDto: CreateBookDto) {
    return this.prismaService.book.create({ data: createBookDto });
  }

  async findAll() {
    return this.prismaService.book.findMany();
  }

  async findOne(id: number) {
    return this.prismaService.book.findUnique({ where: { id } });
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
}
