import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { IHotelRepository } from '../domain/repositories/IHotel.repositories';
import { HOTEL_REPOSITORY_TOKEN } from '../utils/repositoriesTokens';
import { join, resolve } from 'path';
import { stat, unlink } from 'fs/promises';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import { REDIS_HOTEL_KEY } from '../utils/redisKey';

@Injectable()
export class UploadImageHotelService {

  constructor(
    @Inject(HOTEL_REPOSITORY_TOKEN)
    private readonly hotelRepositories: IHotelRepository,

    @InjectRedis()
    private readonly redis: Redis
  ) { }

  async execute(id: string, imageFileName: string) {

    const hotel = await this.hotelRepositories.findHotelById(Number(id))
    const directory = resolve(__dirname, '..', '..', '..', '..', 'uploads-hotel')

    if (!hotel) {
      throw new NotFoundException('Hotel not found.')
    }

    if (hotel.image) {
      const hotelImageFilePath = join(directory, hotel.image)
      const hotelImageFileExists = await stat(hotelImageFilePath)

      if (hotelImageFileExists) {
        await unlink(hotelImageFilePath)
      }
    }

    await this.redis.del(REDIS_HOTEL_KEY)

    return await this.hotelRepositories.updateHotel(Number(id), {
      image: imageFileName
    })
  }
}
