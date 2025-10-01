import { Role } from "@prisma/client"
import { IsEmail, IsEmpty, IsEnum, IsString } from "class-validator"

export class CreateUserDTO {
    @IsString()
    @IsEmpty()
    name: string

    @IsEmail()
    @IsEmpty()
    email: string

    @IsString()
    @IsEmpty()
    password: string

    @IsEnum(Role)
    @IsEmpty()
    role: Role
}