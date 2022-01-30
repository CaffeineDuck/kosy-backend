import { ForbiddenException, Injectable } from '@nestjs/common';
import { Book, BookComment } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { UpdateCommentDto } from '../dto/update-comment.dto';

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

  async findOne(id: number): Promise<BookComment> {
    return this.prismaService.bookComment.findUnique({
      where: { id },
      include: { replies: true },
    });
  }

  async create(
    createCommentDto: CreateCommentDto,
    userId: number,
  ): Promise<BookComment> {
    const { bookId, content } = createCommentDto;
    return this.prismaService.bookComment.create({
      data: {
        content,
        user: { connect: { id: userId } },
        book: { connect: { id: bookId } },
      },
    });
  }

  async delete(commentId: number): Promise<void> {
    await this.prismaService.bookComment.delete({
      where: { id: commentId },
    });
  }

  async update(
    commentId: number,
    updateCommentDto: UpdateCommentDto,
  ): Promise<void> {
    await this.prismaService.bookComment.update({
      where: { id: commentId },
      data: updateCommentDto,
    });
  }

  async reply(
    commentId: number,
    replyDto: CreateCommentDto,
    userId: number,
  ): Promise<BookComment> {
    const { bookId, content } = replyDto;
    return this.prismaService.bookComment.create({
      data: {
        book: { connect: { id: bookId } },
        user: { connect: { id: userId } },
        repliedTo: { connect: { id: commentId } },
        content,
      },
    });
  }
}
