import { Controller, Get, Post, Body, Patch, UseGuards } from '@nestjs/common';
import { CreateReservationDto } from '../domain/dto/create-reservation.dto';
import { CreateReservationService } from '../service/createReservation.service';
import { AuthGuard } from 'src/shared/guards/auth.guards';
import { User } from 'src/shared/decorators/user.decorator';
import { ParamId } from 'src/shared/decorators/paramId.decorator';
import { FindAllHotelsService } from 'src/modules/hotels/services/findAllHotel.service';
import { FindByIdReservationsService } from '../service/findByIdReservation.service';
import { FindByUserReservationsService } from '../service/findByUserReservations.service';
import { ReservationStatus, Role } from '@prisma/client';
import { UpdateStatusReservationsService } from '../service/updateStatusReservations.service';
import { RoleGuard } from 'src/shared/guards/role.guard';
import { Roles } from 'src/shared/decorators/roles.decorators';

@UseGuards(AuthGuard, RoleGuard)
@Controller('reservations')
export class ReservationsController {
  constructor(
    private readonly createReservationsService: CreateReservationService,
    private readonly findAllReservationsService: FindAllHotelsService,
    private readonly findByIdReservationService: FindByIdReservationsService,
    private readonly findByUserReservationsService: FindByUserReservationsService,
    private readonly updateStatusReservationsService: UpdateStatusReservationsService
  ) { }

  @Roles(Role.USER)
  @Post()
  create(@User('id') id: number, @Body() body: CreateReservationDto) {
    return this.createReservationsService.execute(id, body);
  }

  @Get()
  findAll() {
    return this.findAllReservationsService.execute();
  }

  @Get('user')
  findByUser(@User('id') id: number) {
    return this.findByUserReservationsService.execute(id);
  }

  @Get(':id')
  findOne(@ParamId() id: number) {
    return this.findByIdReservationService.execute(id);
  }

  @Roles(Role.ADMIN)
  @Patch(':id')
  updateStatus(
    @ParamId() id: number,
    @Body('status') status: ReservationStatus
  ) {
    return this.updateStatusReservationsService.execute(id, status);
  }
}
