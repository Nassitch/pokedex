import { Body, Controller, Delete, Get, Put, Request, UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from 'src/models/user.dto';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService,
    ) {}
    
    @Get('')
    getCards(@Request() req: any) {
        const userId = req.user.id;
        return this.userService.getUser(userId);
    } 
    
    @Get("/all")
    findAll() {
        return this.userService.getAllUsers();
    }
    
    
    @Put('')
    update(@Request() req: any, @Body() newUser: UserDto) {
        const userId: number = req.user.id;
        return this.userService.updateUser(userId, newUser);
    }
    
    @Delete('')
    remove(@Request() req: any) {
        const userId: number = req.user.id;
        return this.userService.deleteUser(userId);
      }
}