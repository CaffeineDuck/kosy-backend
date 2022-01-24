import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @MaxLength(200)
  @MinLength(1)
  content: string;
  
  @IsNumber()
  bookId: number
}
