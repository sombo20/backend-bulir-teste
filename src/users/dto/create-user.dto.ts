import { IsString, IsEmail, IsNotEmpty, IsEnum, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(11, 14)
  nif: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  password: string;

  @IsEnum(['CLIENT', 'PROVIDER'])
  @IsNotEmpty()
  role: 'CLIENT' | 'PROVIDER';
}
