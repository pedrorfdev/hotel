import { Injectable } from "@nestjs/common";
import type { IReservationRepository } from "../domain/repositories/IReservation.repository";
import { ReservationStatus } from "@prisma/client";

@Injectable()
export class UpdateStatusReservationsService {
    constructor(
        private readonly reservationRepository: IReservationRepository,
    ) { }

    async execute(id: number, status: ReservationStatus) {
        return await this.reservationRepository.findById(id)
    }
}