import { Reservation } from "@prisma/client";

export interface IReservationRepository {
    create(data: any): Promise<Reservation>
    findById(id: number): Promise<Reservation>
    findAll(): Promise<Reservation[]>
    findByUser(userId: number): Promise<Reservation[]>
}