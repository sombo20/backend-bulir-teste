import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
} from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';
import { Service } from 'src/services/services.model';

@Table
export class Reservation extends Model<Reservation> {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  clientId: number;

  @ForeignKey(() => Service)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  serviceId: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  date: Date;

  @Column({
    type: DataType.ENUM('pending', 'confirmed', 'cancelled'),
    allowNull: false,
    defaultValue: 'pending',
  })
  status: 'pending' | 'confirmed' | 'cancelled';
}
