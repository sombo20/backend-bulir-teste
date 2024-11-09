import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
} from 'sequelize-typescript';
import { User } from 'src/users/users.model';

@Table
export class Service extends Model<Service> {
  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING })
  description: string;

  @Column({ type: DataType.FLOAT })
  price: number;

  @ForeignKey(() => User)
  @Column
  providerId: number;
}
