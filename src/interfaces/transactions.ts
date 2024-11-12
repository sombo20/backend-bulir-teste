import { Reservation } from 'src/reservations/entities/reservation.entity';

export interface TransactionsReservationsResponse {
  pendingReservations: Reservation[];
  accountBalance: number;
}
