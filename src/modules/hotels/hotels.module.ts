import { Module } from '@nestjs/common';
import { HotelsController } from './infra/hotels.controller';
import { CreateHotelService } from './services/createHotel.service';
import { FindAllHotelsService } from './services/findAllHotel.service';
import { FindOneHotelService } from './services/findOneHotel.service';
import { UpdateHotelService } from './services/updateHotel.service';
import { RemoveHotelService } from './services/removeHotel.service';
import { PrismaModule } from '../prisma/prisma.module';
import { HotelsRepositories } from './infra/hotels.repository';
import { HOTEL_REPOSITORY_TOKEN } from './utils/repositoriesTokens';
import { FindHotelByNameService } from './services/findHotelByName.service';
import { FindHotelByOwnerService } from './services/findHotelByOwner.service';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../users/user.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule],
  controllers: [HotelsController],
  providers: [
    CreateHotelService,
    FindAllHotelsService,
    FindOneHotelService,
    FindHotelByNameService,
    FindHotelByOwnerService,
    UpdateHotelService,
    RemoveHotelService,
    {
      provide: HOTEL_REPOSITORY_TOKEN,
      useClass: HotelsRepositories
    }
  ],
})
export class HotelsModule { }
