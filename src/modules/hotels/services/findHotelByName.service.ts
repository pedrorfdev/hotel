import { Inject, Injectable } from '@nestjs/common';
import { HOTEL_REPOSITORY_TOKEN } from '../utils/repositoriesTokens';
import type { IHotelRepository } from '../domain/repositories/IHotel.repositories';

@Injectable()
export class FindHotelByNameService {

  constructor(
    @Inject(HOTEL_REPOSITORY_TOKEN)
    private readonly hotelRepositories: IHotelRepository
  ) { }

  async execute(name: string) {
    return await this.hotelRepositories.findHotelByName(name)
  }
}