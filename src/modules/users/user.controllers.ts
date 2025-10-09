import { Body, Controller, Delete, Get, Patch, Post, UseGuards } from "@nestjs/common";
import { UserService } from "./user.services";
import { CreateUserDTO } from "./domain/dto/createUser.dto";
import { UpdateUserDTO } from "./domain/dto/updateUser.dto";
import { ParamId } from "src/shared/decorators/paramId.decorator";
import { AuthGuard } from "src/shared/guards/auth.guards";
import { User } from "src/shared/decorators/user.decorator";
import { Role, type User as UserType } from "@prisma/client";
import { RoleGuard } from "src/shared/guards/role.guard";
import { Roles } from "src/shared/decorators/roles.decorators";
import { UserMatchGuard } from "src/shared/guards/userMatch.guard";

@UseGuards(AuthGuard, RoleGuard)
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    list(@User() user: UserType) {
        console.log(user);

        return this.userService.list();
    }

    @Get(':id')
    show(@ParamId() id: number) {
        return this.userService.show(id);
    }

    @Roles(Role.ADMIN)
    @Post()
    create(@Body() body: CreateUserDTO) {
        return this.userService.create(body);
    }

    @UseGuards(UserMatchGuard)
    @Roles(Role.ADMIN, Role.USER)
    @Patch(':id')
    update(@ParamId() id: number, @Body() body: UpdateUserDTO) {
        return this.userService.update(id, body);
    }

    @UseGuards(UserMatchGuard)
    @Delete(':id')
    delete(@ParamId() id: number) {
        return this.userService.delete(id)
    }
}