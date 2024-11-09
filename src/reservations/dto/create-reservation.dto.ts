import { IsNumber, IsDateString } from 'class-validator';

export class CreateReservationDto {
  @IsNumber()
  clientId: number;

  @IsNumber()
  serviceId: number;

  @IsDateString()
  date: Date;
}
