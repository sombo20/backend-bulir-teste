import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from './entities/service.entity';
import { ServiceRepository } from './services.repository';
import { UserRepository } from 'src/users/user.repository';

@Injectable()
export class ServiceService {
  constructor(
    private readonly serviceRepository: ServiceRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async findAll(): Promise<Service[]> {
    return this.serviceRepository.findAll();
  }

  async findOne(id: number): Promise<Service> {
    const service = await this.serviceRepository.findById(id);
    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }
    return service;
  }

  async findAllById(id: number): Promise<Service[]> {
    const services = await this.serviceRepository.findAllById(id);
    if (!services || services.length === 0) {
      throw new NotFoundException(`No services found with provider ID ${id}`);
    }
    return services;
  }

  async create(createServiceDto: CreateServiceDto): Promise<Service> {
    const providerExist = await this.userRepository.findProviderById(
      createServiceDto.providerId,
    );

    if (!providerExist) {
      throw new HttpException(
        `Provider with ID #${createServiceDto.providerId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.serviceRepository.create(createServiceDto);
  }

  async update(
    id: number,
    updateServiceDto: UpdateServiceDto,
  ): Promise<Service> {
    const service = await this.serviceRepository.update(id, updateServiceDto);
    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }
    return service;
  }

  async remove(id: number): Promise<void> {
    await this.serviceRepository.remove(id);
  }
}
