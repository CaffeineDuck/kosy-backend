import { IsISBN, IsNumber, IsString } from 'class-validator';

export class CreateBookDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  author: string;

  @IsISBN()
  ISBN?: string;
}
