import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators/publicRoute.decorator';
import { User } from 'src/decorators/user.decorator';
import { JwtUserPayload } from 'src/modules/auth/dto/jwtPayload.dto';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { UpdateCommentDto } from '../dto/update-comment.dto';
import { CommentService } from '../services/comments.service';

@UseGuards(JwtAuthGuard)
@Controller('comment')
@ApiTags('book comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Public()
  @Get(':id')
  async get(@Param('id') bookId: string) {
    return this.commentService.findOne(+bookId);
  }

  @ApiBearerAuth()
  @Post()
  async create(
    @Body() commentDto: CreateCommentDto,
    @User() userJwt: JwtUserPayload,
  ) {
    return this.commentService.create(commentDto, userJwt.userId);
  }

  @ApiBearerAuth()
  @Delete(':id')
  async delete(@Param('id') id: string, @User() userJwt: JwtUserPayload) {
    await this.commentService.verifyUserComment(+id, userJwt.userId);
    return this.commentService.delete(+id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
    @User() userJwt: JwtUserPayload,
  ) {
    await this.commentService.verifyUserComment(+id, userJwt.userId);
    return this.commentService.update(+id, updateCommentDto);
  }

  @ApiBearerAuth()
  @Post(':id/reply')
  async reply(
    @Param('id') id: string,
    @Body() replyDto: CreateCommentDto,
    @User() userJwt: JwtUserPayload,
  ) {
    return this.commentService.reply(+id, replyDto, userJwt.userId);
  }
}
