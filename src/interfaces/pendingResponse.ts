import { Reservation } from 'src/reservations/entities/reservation.entity';

export interface PendingReservationsResponse {
  totalPending: number;
  pendingReservations: Reservation[];
  accountBalance: number;
}
