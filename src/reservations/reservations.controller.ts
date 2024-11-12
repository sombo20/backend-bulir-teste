import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
  SetMetadata,
  Patch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ReservationService } from './reservations.service';
import { RoleGuard } from 'src/auth/guards/role.guard';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationService) {}

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  async findAll() {
    return this.reservationsService.findAll();
  }

  @SetMetadata('role', ['PROVIDER'])
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get(':id')
  async findAllPendingReservations(@Param('id') id: string) {
    return this.reservationsService.findAllPendingReservations(+id);
  }

  @SetMetadata('role', ['CLIENT'])
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  async create(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationsService.create(createReservationDto);
  }

  @SetMetadata('role', ['PROVIDER'])
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.reservationsService.findOne(+id);
  }

  @SetMetadata('role', ['ADMIN'])
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.reservationsService.remove(+id);
  }

  @Patch(':id/status')
  @SetMetadata('role', ['PROVIDER'])
  @UseGuards(JwtAuthGuard, RoleGuard)
  async updateReservationStatus(
    @Param('id') id: number,
    @Body('status') status: 'confirm' | 'cancell',
  ) {
    if (status === 'confirm') {
      return await this.reservationsService.confirmReservation(id);
    } else if (status === 'cancell') {
      return await this.reservationsService.cancelReservation(id);
    } else {
      throw new HttpException('Invalid status', HttpStatus.BAD_REQUEST);
    }
  }
}
