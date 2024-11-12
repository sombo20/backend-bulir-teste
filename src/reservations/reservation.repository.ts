import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Reservation } from './entities/reservation.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UserRepository } from 'src/users/user.repository';
import { ServiceRepository } from 'src/services/services.repository';

@Injectable()
export class ReservationRepository {
  constructor(
    @InjectModel(Reservation)
    private readonly reservationModel: typeof Reservation,
    private readonly userRepository: UserRepository,
    private readonly serviceRepositoy: ServiceRepository,
  ) {}

  async findAllPendingReservations(id: number): Promise<any[]> {
    const reservations = await this.reservationModel.findAll({
      where: { status: 'pending' },
      include: [
        {
          model: this.userRepository.getUserModel(),
          as: 'user',
          attributes: ['name'],
        },
        {
          model: this.serviceRepositoy.getServiceModel(),
          as: 'service',
          attributes: ['name'],
          where: { providerId: id },
        },
      ],
      attributes: ['id', 'date'],
    });

    return reservations.map((reservation) => ({
      id: reservation.id,
      userName: reservation.user.name,
      serviceName: reservation.service.name,
      reservationDate: reservation.date,
    }));
  }

  async countPendingReservations(id: number): Promise<number> {
    const totalPendingReservations = await this.reservationModel.count({
      include: [
        {
          model: this.serviceRepositoy.getServiceModel(),
          as: 'service',
          attributes: ['name'],
          where: { providerId: id },
        },
      ],
    });

    return totalPendingReservations;
  }

  async countTotalBalance(id: number): Promise<number> {
    const totalBalance = await this.reservationModel.count({
      include: [
        {
          model: this.userRepository.getUserModel(),
          as: 'user',
          attributes: ['balance'],
          where: { id },
        },
      ],
    });

    return totalBalance;
  }

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
