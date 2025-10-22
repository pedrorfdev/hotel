import { Hotel } from "@prisma/client";
import { CreateHotelDto } from "../domain/dto/create-hotel.dto";
import { IHotelRepository } from "../domain/repositories/IHotel.repositories";
import { PrismaService } from "src/modules/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { UpdateHotelDto } from "../domain/dto/update-hotel.dto";

@Injectable()
export class HotelsRepositories implements IHotelRepository {
    constructor(private readonly prisma: PrismaService) { }

    createHotel(data: CreateHotelDto): Promise<Hotel> {
        return this.prisma.hotel.create({ data })
    }

    findHotelById(id: number): Promise<Hotel | null> {
        return this.prisma.hotel.findUnique({
            where: {
                id,
            }
        })
    }

    findHotelByName(name: string): Promise<Hotel | null> {
        return this.prisma.hotel.findFirst({
            where: {
                name,
            }
        })
    }

    findHotels(): Promise<Hotel[]> {
        return this.prisma.hotel.findMany()
    }

    findHotelByOwner(ownerId: number): Promise<Hotel[]> {
        return this.prisma.hotel.findMany({
            where: {
                ownerId,
            }
        })
    }

    updateHotel(id: number, data: UpdateHotelDto): Promise<Hotel> {
        return this.prisma.hotel.update({
            where: { id },
            data
        })
    }
    deleteHotel(id: number): Promise<Hotel> {
        throw new Error("Method not implemented.");
    }

}