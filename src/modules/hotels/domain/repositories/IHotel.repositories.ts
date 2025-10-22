import { Hotel } from "@prisma/client";
import { CreateHotelDto } from "../dto/create-hotel.dto";

export interface IHotelRepository {
    createHotel(data: CreateHotelDto, id: number): Promise<Hotel>
    findHotelById(id: number): Promise<Hotel | null>
    findHotelByName(name: string): Promise<Hotel[] | null>;
    findHotelByOwner(ownerId: number): Promise<Hotel[]>;
    findHotels(offSet: number, limit: number): Promise<Hotel[]>;
    countHotels(): Promise<number>
    updateHotel(id: number, data: Partial<CreateHotelDto>): Promise<Hotel>;
    deleteHotel(id: number): Promise<Hotel>;
}