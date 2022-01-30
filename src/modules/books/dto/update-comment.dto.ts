import { IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateCommentDto {
  @IsString()
  @MaxLength(200)
  @MinLength(1)
  content: string;
}
