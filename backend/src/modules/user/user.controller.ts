import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from 'src/models/user.dto';

@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService,
    ) {}
    
    
    
    @Get("/:id")
    getUser(@Param("id", ParseIntPipe) id: number) {
        return this.userService.getUser({ id });
    }

    @Get()
    findAll() {
      return this.userService.getAllUsers();
    }

    @Post()
    async create(@Body() newUser: UserDto) {
      return this.userService.createUser(newUser);
    }
    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() newUser: UserDto) {
        return this.userService.updateUser(id, newUser);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.userService.deleteUser(id);
      }
}