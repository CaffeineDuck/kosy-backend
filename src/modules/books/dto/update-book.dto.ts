import { PartialType } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';
import { CreateBookDto } from './create-book.dto';

export class UpdateBookDto extends PartialType(CreateBookDto) {
  @IsBoolean()
  published: boolean
}
