import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'src/decorators/user.decorator';
import { JwtUserPayload } from 'src/modules/auth/dto/jwtPayload.dto';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { CommentService } from '../services/comments.service';

@Controller('comment')
@ApiTags('book comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() commentDto: CreateCommentDto,
    @User() userJwt: JwtUserPayload,
  ) {
    return this.commentService.create(commentDto, userJwt.userId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string, @User() userJwt: JwtUserPayload) {
    console.log(id)
    return this.commentService.delete(+id, userJwt.userId);
  }
}
