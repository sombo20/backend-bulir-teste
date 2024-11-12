import {
  Injectable,
  NotFoundException,
  BadRequestException,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ReservationRepository } from './reservation.repository';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { Reservation } from './entities/reservation.entity';
import { UserRepository } from '../users/user.repository';
import { ServiceRepository } from 'src/services/services.repository';
import { PendingReservationsResponse } from 'src/interfaces/pendingResponse';
import { TransactionsReservationsResponse } from 'src/interfaces/transactions';

@Injectable()
export class ReservationService {
  constructor(
    private readonly reservationRepository: ReservationRepository,
    private readonly serviceRepository: ServiceRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async findAll(): Promise<Reservation[]> {
    return this.reservationRepository.findAll();
  }

  async findAllPendingReservations(
    id: number,
  ): Promise<PendingReservationsResponse> {
    const totalPendingReservations =
      await this.reservationRepository.countPendingReservations(+id);
    const pendingReservations =
      await this.reservationRepository.findAllPendingReservations(+id);

    const totalBalance = await this.reservationRepository.getUserBalance(+id);

    return {
      accountBalance: totalBalance,
      totalPending: totalPendingReservations,
      pendingReservations: pendingReservations,
    };
  }

  async findAllTransactions(
    id: number,
  ): Promise<TransactionsReservationsResponse> {
    const pendingReservations =
      await this.reservationRepository.findAllTransactionsReservations(+id);

    const totalBalance = await this.reservationRepository.getUserBalance(+id);

    return {
      accountBalance: totalBalance,
      pendingReservations: pendingReservations,
    };
  }

  async findOne(id: number): Promise<Reservation> {
    const reservation = await this.reservationRepository.findById(id);
    if (!reservation) {
      throw new NotFoundException(`Reservation with ID ${id} not found`);
    }
    return reservation;
  }

  async confirmReservation(reservationId: number) {
    const reservation =
      await this.reservationRepository.findById(reservationId);
    if (!reservation) {
      throw new HttpException('Reservation not found', HttpStatus.NOT_FOUND);
    }

    if (reservation.status !== 'pending') {
      throw new HttpException(
        'Reservation cannot be confirmed',
        HttpStatus.BAD_REQUEST,
      );
    }

    reservation.status = 'confirmed';
    await reservation.save();

    const service = await this.serviceRepository.findById(
      reservation.serviceId,
    );

    const client = await this.userRepository.findClientById(
      reservation.clientId,
    );

    if (client.balance < service.price) {
      throw new BadRequestException('Insufficient balance');
    }

    client.balance -= service.price;
    await client.save();

    const provider = await this.userRepository.findById(service.providerId);
    const newBalance = Number(provider.balance) + Number(service.price);
    await this.userRepository.updateProviderBalance(provider.id, newBalance);
    return reservation;
  }

  async cancelReservation(reservationId: number) {
    const reservation =
      await this.reservationRepository.findById(reservationId);
    if (!reservation) {
      throw new HttpException('Reservation not found', HttpStatus.NOT_FOUND);
    }

    if (reservation.status !== 'pending') {
      throw new HttpException(
        'Reservation cannot be canceled',
        HttpStatus.BAD_REQUEST,
      );
    }

    reservation.status = 'cancelled';
    await reservation.save();
    return reservation;
  }

  async create(
    createReservationDto: CreateReservationDto,
  ): Promise<Reservation> {
    const { clientId, serviceId } = createReservationDto;

    const client = await this.userRepository.findClientById(clientId);
    const service = await this.serviceRepository.findById(serviceId);
    if (!client || !service) {
      throw new NotFoundException('Client or Service not found');
    }

    if (client.balance < service.price) {
      throw new BadRequestException('Insufficient balance');
    }

    const hasPendingReservation =
      await this.reservationRepository.checkForPendingReservation(
        clientId,
        serviceId,
      );

    if (hasPendingReservation) {
      throw new HttpException(
        "There's already a pending reservation for this service.",
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.reservationRepository.create(createReservationDto);
  }

  async remove(id: number): Promise<void> {
    await this.reservationRepository.remove(id);
  }
}
