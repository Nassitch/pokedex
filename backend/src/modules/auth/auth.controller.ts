import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from 'src/models/user.dto';
import { AuthService } from './auth.service';
import { AuthBody } from 'src/models/auth.body.type';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('sign-up')
    async create(@Body() newUser: UserDto) {
        return this.authService.createUser(newUser);
    }

    @Post('login')
    async login(@Body() authBody: AuthBody) {
        return await this.authService.logIn({authBody})
    }
}
