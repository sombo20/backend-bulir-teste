import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServiceService } from './services.service';
import { RoleGuard } from 'src/auth/guards/role.guard';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServiceService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.servicesService.findAll();
  }

  @SetMetadata('role', ['PROVIDER'])
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  async create(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(createServiceDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.servicesService.findOne(+id);
  }

  @SetMetadata('role', ['PROVIDER'])
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    return this.servicesService.update(+id, updateServiceDto);
  }

  @SetMetadata('role', ['ADMIN', 'PROVIDER'])
  @UseGuards(JwtAuthGuard, RoleGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.servicesService.remove(+id);
  }
}
