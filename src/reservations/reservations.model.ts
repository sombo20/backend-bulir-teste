import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
} from 'sequelize-typescript';
import { Service } from 'src/services/services.model';
import { User } from 'src/users/users.model';

@Table
export class Reservation extends Model<Reservation> {
  @ForeignKey(() => User)
  @Column
  clientId: number;

  @ForeignKey(() => Service)
  @Column
  serviceId: number;

  @Column({ type: DataType.DATE })
  date: Date;

  @Column({
    type: DataType.ENUM,
    values: ['pending', 'confirmed', 'cancelled'],
  })
  status: 'pending' | 'confirmed' | 'cancelled';
}
