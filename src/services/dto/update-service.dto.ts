import { IsString, IsNumber, IsOptional, Length } from 'class-validator';

export class UpdateServiceDto {
  @IsString()
  @IsOptional()
  @Length(6, 200)
  name: string;

  @IsString()
  @IsOptional()
  @Length(6, 200)
  description: string;

  @IsNumber()
  @IsOptional()
  price: number;

  @IsNumber()
  @IsOptional()
  providerId: number;
}
