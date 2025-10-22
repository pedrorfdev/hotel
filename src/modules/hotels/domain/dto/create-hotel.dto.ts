import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateHotelDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    name: string

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    description: string

    @IsString()
    @IsOptional()
    @MaxLength(255)
    image?: string

    @IsNumber()
    @IsNotEmpty()
    price: number

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    address: string

    @IsNumber()
    @IsNotEmpty()
    ownerId: number
}
