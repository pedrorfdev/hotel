import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Role, User } from "@prisma/client";
import { AuthLoginDTO } from "./domain/dto/authLogin.dto";
import * as bcrypt from 'bcrypt';
import { UserService } from "../users/user.services";
import { AuthRegisterDTO } from "./domain/dto/authRegister.dto";
import { CreateUserDTO } from "../users/domain/dto/createUser.dto";
import { AuthResetPasswordDTO } from "./domain/dto/authResetPassword.dto";
import { ValidateTokenDTO } from "./domain/dto/validateToken.dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService
    ) { }

    async generateJwtToken(user: User, expiresIn: string = '1d') {
        const payload = {
            sub: user.id,
            name: user.name
        }

        const options = {
            expiresIn: '1d',
            issuer: 'hotel',
            audience: 'users'
        }

        return { acces_token: this.jwtService.sign(payload, options) }
    }

    async login({ email, password }: AuthLoginDTO) {
        const user = await this.userService.findByEmail(email)

        if (!user || await bcrypt.compare(password, user.password)) {
            throw new UnauthorizedException('Email or password is incorrect')
        }

        return await this.generateJwtToken(user)
    }

    async register(body: AuthRegisterDTO) {
        const newUser: CreateUserDTO = {
            email: body.email!,
            name: body.name!,
            password: body.password!,
            role: body.role ?? Role.USER,
        };

        const user = await this.userService.create(newUser);

        return await this.generateJwtToken(user);
    }

    async reset({ token, password }: AuthResetPasswordDTO) {
        const { valid, decoded } = await this.validateToken(token)

        if (!valid) throw new UnauthorizedException('Invalid Token')

        const user = await this.userService.update(Number(decoded?.sub), { password })

        return await this.generateJwtToken(user)
    }

    async forgot(email: string) {
        const user = await this.userService.findByEmail(email)

        if (!user) {
            throw new UnauthorizedException('Email is incorrect')
        }

        const token = this.generateJwtToken(user, '30m')

        //enviar o email com o token jwt para resetar a senha

        return token
    }

    async validateToken(token: string): Promise<ValidateTokenDTO> {
        try {
            const { decoded } = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_SECRET,
                issuer: 'hotel',
                audience: 'users'
            })

            return { valid: true, decoded }
        } catch (error) {
            return { valid: false, message: error.message }
        }
    }
}