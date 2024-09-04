import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';


@Injectable()
export class FavoriteService {

    constructor(private prisma: PrismaService) { }
    
    async getAllFavorite(userId: number) {
        const userWithCards = await this.prisma.usersOnCards.findMany({
            where: {
                userId: userId
          },
          include: {
            card: true
          }
        })

        if (userWithCards.length === 0) {
          throw new NotFoundException(`Favorie n'existe pas!`)
        }

        return userWithCards.map((userOnCard) => ({
          userId: userOnCard.userId,
          cardId: userOnCard.cardId,
          ref: userOnCard.card.ref
        }));
    }

    async addUserToCard(userId: number, cardId: number) {
        return this.prisma.usersOnCards.create({
          data: {
            userId,
            cardId,
          },
        });
  }
  
  async deleteToCard(userId: number, cardId: number) {
    return this.prisma.usersOnCards.delete({
      where: {
        userId_cardId: {
          userId: userId,
          cardId: cardId
        }
      }
    });
}
}
