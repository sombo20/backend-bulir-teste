import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Reservation } from './entities/reservation.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UserRepository } from 'src/users/user.repository';
import { ServiceRepository } from 'src/services/services.repository';
import { Sequelize } from 'sequelize-typescript';
import { QueryTypes } from 'sequelize';

@Injectable()
export class ReservationRepository {
  constructor(
    @InjectModel(Reservation)
    private readonly reservationModel: typeof Reservation,
    private readonly userRepository: UserRepository,
    private readonly serviceRepositoy: ServiceRepository,
    private readonly sequelize: Sequelize,
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

  async findAllTransactionsReservations(id: number): Promise<any[]> {
    const query = `
    SELECT
      Reservation.id,
      Reservation.date,
      Reservation.status,
      Service.name AS service_name,
      Service.price AS service_price,
      User.name AS provider_name
    FROM Reservations AS Reservation
    INNER JOIN Services AS Service ON Reservation.serviceId = Service.id
    LEFT JOIN Users AS User ON Service.providerId = User.id
    WHERE Reservation.clientId = :clientId;
  `;

    const results = await this.sequelize.query(query, {
      replacements: { clientId: id },
      type: QueryTypes.SELECT,
    });

    return results as any[];
  }

  async countPendingReservations(id: number): Promise<number> {
    const totalPendingReservations = await this.reservationModel.count({
      where: { status: 'pending' },
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

  async getUserBalance(id: number): Promise<number> {
    const user = await this.userRepository.getUserModel().findOne({
      where: { id },
      attributes: ['balance'],
    });

    return user ? user.balance : 0;
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
