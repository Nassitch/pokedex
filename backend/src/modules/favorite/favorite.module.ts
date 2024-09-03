import { Module } from '@nestjs/common';
import { FavoriteController } from './favorite.controller';
import { FavoriteService } from './favorite.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [FavoriteController],
  providers: [FavoriteService, PrismaService]
})
export class FavoriteModule {}
