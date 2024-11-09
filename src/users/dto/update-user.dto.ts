import { IsString, IsEmail, IsOptional, Length, IsEnum } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  @Length(11, 14)
  nif?: string;

  @IsString()
  @IsOptional()
  @Length(6, 20)
  password?: string;

  @IsEnum(['CLIENT', 'PROVIDER'])
  @IsOptional()
  role?: 'CLIENT' | 'PROVIDER';
}
