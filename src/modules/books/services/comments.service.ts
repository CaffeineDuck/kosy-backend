import { ForbiddenException, Injectable } from '@nestjs/common';
import { BookComment } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateCommentDto } from '../dto/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(private prismaService: PrismaService) {}

  async verifyUserComment(id: number, userId: number): Promise<BookComment> {
    const book = await this.prismaService.bookComment.findUnique({
      where: { id },
    });

    if (!book || book.userId != userId) {
      throw new ForbiddenException('You are not the seller of this book');
    }

    return book;
  }

  async create(
    createCommentDto: CreateCommentDto,
    userId: number,
  ): Promise<BookComment> {
    const { bookId, ...commentDto } = createCommentDto;
    return this.prismaService.bookComment.create({
      data: {
        ...commentDto,
        user: { connect: { id: userId } },
        book: { connect: { id: createCommentDto.bookId } },
      },
    });
  }

  async delete(commentId: number, userId: number): Promise<void> {
    await this.verifyUserComment(commentId, userId);
    await this.prismaService.bookComment.delete({
      where: { id: commentId },
    });
  }
}
