import { Module } from '@nestjs/common';
import { UtilsService } from './utils.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [UtilsService,  PrismaService]
})
export class UtilsModule {}
