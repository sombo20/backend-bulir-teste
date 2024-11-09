import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @Column({ type: DataType.STRING, unique: true })
  email: string;

  @Column({ type: DataType.STRING })
  password: string;

  @Column({ type: DataType.STRING })
  fullName: string;

  @Column({ type: DataType.STRING, unique: true })
  nif: string;

  @Column({ type: DataType.INTEGER })
  balance: number;

  @Column({ type: DataType.ENUM, values: ['CLIENT', 'PROVIDER'] })
  type: 'CLIENT' | 'PROVIDER';
}
