import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServicesController } from './services.controller';
import { Service } from './entities/service.entity';
import { ServiceRepository } from './services.repository';
import { ServiceService } from './services.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [SequelizeModule.forFeature([Service]), UsersModule],
  providers: [ServiceService, ServiceRepository],
  controllers: [ServicesController],
  exports: [ServiceRepository],
})
export class ServicesModule {}
