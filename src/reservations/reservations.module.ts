import { Module } from '@nestjs/common';
import { ReservationRepository } from './reservation.repository';
import { UsersModule } from '../users/users.module';
import { ReservationService } from './reservations.service';
import { Reservation } from './entities/reservation.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServicesModule } from 'src/services/services.module';
import { ReservationsController } from './reservations.controller';

@Module({
  imports: [
    SequelizeModule.forFeature([Reservation]),
    UsersModule,
    ServicesModule,
  ],
  providers: [ReservationService, ReservationRepository],
  controllers: [ReservationsController],
  exports: [ReservationService, ReservationRepository],
})
export class ReservationsModule {}
