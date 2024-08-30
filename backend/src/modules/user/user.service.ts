import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { User, Prisma } from '@prisma/client';
import { UserDto } from 'src/models/user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUser( { id}: { id: number }) {
      const  user = await this.prisma.user.findUnique({
        where: {
          id: id
        },
        select: {
          id: true,
          name: true,
          email: true
        }
    });
    return user;
  }

  

  async getAllUsers() {
    return this.prisma.user.findMany();
  }

 

  async updateUser(id: number, newUser: UserDto) {
    return this.prisma.user.update({
      
    where: {
      id: id
    },
      data: {
        ...newUser
      },
    });
  }

  async deleteUser(id: number) {
    return this.prisma.user.delete({
      where: {
        id: id
      },
    });
  }

  
}
