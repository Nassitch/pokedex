import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Request, UseGuards } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('favorite')
export class FavoriteController {

    constructor(
        private readonly favoriteService: FavoriteService,
    ) { }
    
    @Post('/:id')
    create(@Param("id", ParseIntPipe) id: number, @Request() req: any, @Body() pokemon: string) {
        const userId = req.user.id;
        return this.favoriteService.addUserToCard(userId, id);
    }
    
    @Get('')
    getCards(@Request() req: any) {
        const userId = req.user.id;
        return this.favoriteService.getAllFavorite(userId);
    }  

    @Delete('/:id')
    deleteCard(@Param("id", ParseIntPipe) id: number, @Request() req: any) {
        const userId = req.user.id;
        return this.favoriteService.deleteToCard(userId, id);
    }
}
