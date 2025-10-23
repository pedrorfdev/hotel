import { Inject, Injectable } from "@nestjs/common";
import type { IReservationRepository } from "../domain/repositories/IReservation.repository";
import { REPOSITORY_TOKEN_RESERVATION } from "../utils/repositoriesTokens";

@Injectable()
export class FindAllReservationsService {

    constructor(
        @Inject(REPOSITORY_TOKEN_RESERVATION)
        private readonly reservationsRepository: IReservationRepository
    ) { }

    async execute() {
        return await this.reservationsRepository.findAll()
    }
}