import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Service } from './entities/service.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Sequelize } from 'sequelize-typescript';
import { QueryTypes } from 'sequelize';

@Injectable()
export class ServiceRepository {
  constructor(
    @InjectModel(Service)
    private readonly serviceModel: typeof Service,
    private readonly sequelize: Sequelize,
  ) {}

  async findAll(): Promise<Service[]> {
    const query = `
    SELECT

      Service.id,
      Service.name AS name,
      Service.price AS price,
      Service.description AS description,
      User.name AS provider_name
    FROM Services AS Service
    LEFT JOIN Users AS User ON Service.providerId = User.id
  `;

    const results = await this.sequelize.query(query, {
      type: QueryTypes.SELECT,
    });

    return results as any[];
  }

  async findAllById(id: number): Promise<Service[]> {
    return this.serviceModel.findAll({
      where: {
        providerId: id,
      },
    });
  }

  async findById(id: number): Promise<Service> {
    return this.serviceModel.findByPk(id);
  }

  getServiceModel(): typeof Service {
    return this.serviceModel;
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
