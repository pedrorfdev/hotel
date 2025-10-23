import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CreateReservationDto } from '../domain/dto/create-reservation.dto';
import { UpdateReservationDto } from '../domain/dto/update-reservation.dto';
import { CreateReservationService } from '../service/createReservation.service';
import { AuthGuard } from 'src/shared/guards/auth.guards';
import { User } from 'src/shared/decorators/user.decorator';
import { ParamId } from 'src/shared/decorators/paramId.decorator';
import { FindAllHotelsService } from 'src/modules/hotels/services/findAllHotel.service';
import { FindByIdReservationsService } from '../service/findByIdReservation.service';
import { FindByUserReservationsService } from '../service/findByUserReservations.service';

@UseGuards(AuthGuard)
@Controller('reservations')
export class ReservationsController {
  constructor(
    private readonly createReservationsService: CreateReservationService,
    private readonly findAllReservationsService: FindAllHotelsService,
    private readonly findByIdReservationService: FindByIdReservationsService,
    private readonly findByUserReservationsService: FindByUserReservationsService,
  ) { }

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
    return this.findByIdReservationService.execute(id);
  }

  @Get(':id')
  findOne(@ParamId() id: number) {
    return this.findByIdReservationService.execute(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReservationDto: UpdateReservationDto) {
    return this.reservationsService.update(+id, updateReservationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationsService.remove(+id);
  }
}
