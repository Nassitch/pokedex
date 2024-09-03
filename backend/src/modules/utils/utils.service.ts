import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UtilsService implements OnModuleInit {
    constructor(private readonly prisma: PrismaService) {}

    async onModuleInit() {
        await this.initilizeDatabase();
      }
    
      private async initilizeDatabase() {
        const count = await this.prisma.card.count();
    
        if (count === 0) {
            const data = [];
            
            for (let i = 1; i <= 100; i += 1) {
                data.push({
                    id: i,
                    ref: i
                })
            }

            await this.prisma.card.createMany({
                data: data
            })
        }
      }
}
