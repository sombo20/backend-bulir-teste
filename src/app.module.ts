import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ReservationsModule } from './reservations/reservations.module';
import { ServicesModule } from './services/services.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'reservations',
      autoLoadModels: true,
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    ReservationsModule,
    ServicesModule,
  ],
})
export class AppModule {}
