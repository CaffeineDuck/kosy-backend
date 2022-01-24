import { ForbiddenException, Injectable } from '@nestjs/common';
import { Book } from '@prisma/client';
import { RedisService } from 'nestjs-redis';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateBookDto } from '../dto/create-book.dto';
import { PartialBook } from '../entities/partial-book.entity';
import { UpdateBookDto } from '../dto/update-book.dto';
import { Redis } from 'ioredis';

@Injectable()
export class BooksService {
  FIELDS_FOR_PARTIAL_BOOK = {
    name: true,
    author: true,
    price: true,
    views: true,
    id: true,
  };
  CACHE_TTL = 60 * 60 * 6;
  redisClient: Redis;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly redisService: RedisService,
  ) {
    this.redisClient = this.redisService.getClient();
    this.redis_cache_remover();
  }

  async redis_cache_remover() {
    while (true) {
      await new Promise((resolve) =>
        setTimeout(resolve, (1000 * this.CACHE_TTL) / 3),
      );

      const keys = await this.redisClient.keys('book_views:*');

      if (keys.length === 0) {
        continue;
      }

      const pipeline = this.redisClient.pipeline();
      console.log(await this.redisClient.zscore('book_views:1', 'a'));
      keys.forEach((key) => {
        pipeline.zremrangebyscore(key, 0, Date.now());
      });
      await pipeline.exec();
    }
  }

  async verifyUserBook(id: number, userId: number): Promise<Book> {
    const book = await this.prismaService.book.findUnique({ where: { id } });

    if (!book || book.sellerId != userId) {
      throw new ForbiddenException('You are not the seller of this book');
    }

    return book;
  }

  async findAllUserBooks(userId: number): Promise<PartialBook[]> {
    return this.prismaService.book.findMany({
      where: { seller: { id: userId }, published: true },
      select: this.FIELDS_FOR_PARTIAL_BOOK,
    });
  }

  async findAllUserDrafts(userId: number): Promise<PartialBook[]> {
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
      include: { comments: true, tags: true },
    });
  }

  async handleViews(id: number, fingerPrint?: string) {
    if (!fingerPrint) {
      return;
    }

    const alreadyViewed =
      (await this.redisClient.zscore(`book_views:${id}`, fingerPrint)) != null;
    if (alreadyViewed) {
      return;
    }

    await this.redisClient.zadd(
      `book_views:${id}`,
      Date.now() + this.CACHE_TTL,
      fingerPrint,
    );
    await this.prismaService.book.update({
      where: { id },
      data: { views: { increment: 1 } },
    });
  }

  async findOnePublished(id: number): Promise<Book> {
    return this.prismaService.book.findFirst({
      where: { id, published: true },
      include: { comments: true, tags: true },
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

  async search(query: string): Promise<PartialBook[]> {
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

  async searchUserBooks(query: string, userId: number): Promise<PartialBook[]> {
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
  ): Promise<PartialBook[]> {
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
  ): Promise<PartialBook[]> {
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
