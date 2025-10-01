import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { UserService } from "./user.services";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    list() {
        return this.userService.list();
    }

    @Get(':id')
    show(@Param('id') id: string) {
        return this.userService.show(id);
    }

    @Post()
    create(@Body() body: any) {
        return this.userService.create(body);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() body: any) {
        return this.userService.update(id, body);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.userService.delete(id)
    }
}