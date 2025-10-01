import { Body, Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { UserService } from "./user.services";
import { CreateUserDTO } from "./domain/dto/createUser.dto";
import { UpdateUserDTO } from "./domain/dto/updateUser.dto";
import { ParamId } from "src/shared/decorators/paramId.decorator";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    list() {
        return this.userService.list();
    }

    @Get(':id')
    show(@ParamId() id: number) {
        return this.userService.show(id);
    }

    @Post()
    create(@Body() body: CreateUserDTO) {
        return this.userService.create(body);
    }

    @Patch(':id')
    update(@ParamId() id: number, @Body() body: UpdateUserDTO) {
        return this.userService.update(id, body);
    }

    @Delete(':id')
    delete(@ParamId() id: number) {
        return this.userService.delete(id)
    }
}