import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsEmail()
  email: string;

  @IsString()
  name: string;
}
