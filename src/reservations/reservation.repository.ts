import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Reservation } from './entities/reservation.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Injectable()
export class ReservationRepository {
  constructor(
    @InjectModel(Reservation)
    private readonly reservationModel: typeof Reservation,
  ) {}

  async findAll(): Promise<Reservation[]> {
    return this.reservationModel.findAll();
  }

  async findById(id: number): Promise<Reservation> {
    return this.reservationModel.findByPk(id);
  }

  async checkForPendingReservation(
    clientId: number,
    serviceId: number,
  ): Promise<boolean> {
    const existingReservation = await this.reservationModel.findOne({
      where: {
        clientId,
        serviceId,
        status: 'pending',
      },
    });

    return !!existingReservation;
  }

  async create(
    createReservationDto: CreateReservationDto,
  ): Promise<Reservation> {
    return this.reservationModel.create(createReservationDto);
  }

  async remove(id: number): Promise<void> {
    const reservation = await this.findById(id);
    if (reservation) {
      await reservation.destroy();
    }
  }
}
