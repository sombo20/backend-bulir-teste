import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Reservation } from 'src/reservations/entities/reservation.entity';
import { Service } from 'src/services/entities/service.entity';

@Table
export class User extends Model<User> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  nif: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 5000,
  })
  balance: any;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.ENUM('CLIENT', 'PROVIDER'),
    allowNull: false,
  })
  role: 'CLIENT' | 'PROVIDER';

  @HasMany(() => Reservation)
  reservations: Reservation[];

  @HasMany(() => Service)
  services: Service[];
}
