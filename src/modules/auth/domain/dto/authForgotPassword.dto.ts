import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AuthForgtoPasswordDTO {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string
}