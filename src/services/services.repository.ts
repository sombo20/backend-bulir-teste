import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Service } from './entities/service.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServiceRepository {
  constructor(
    @InjectModel(Service)
    private readonly serviceModel: typeof Service,
  ) {}

  async findAll(): Promise<Service[]> {
    return this.serviceModel.findAll();
  }

  async findById(id: number): Promise<Service> {
    return this.serviceModel.findByPk(id);
  }

  async create(createServiceDto: CreateServiceDto): Promise<Service> {
    return this.serviceModel.create(createServiceDto);
  }

  async update(
    id: number,
    updateServiceDto: UpdateServiceDto,
  ): Promise<Service> {
    const service = await this.findById(id);
    if (service) {
      await service.update(updateServiceDto);
      return service;
    }
    return null;
  }

  async remove(id: number): Promise<void> {
    const service = await this.findById(id);
    if (service) {
      await service.destroy();
    }
  }
}
