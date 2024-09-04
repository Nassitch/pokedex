import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { UserDto } from 'src/models/user.dto';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService extends AuthService {
  constructor(prisma: PrismaService, jwt: JwtService) {
    super(prisma, jwt);
  }

  async getUser(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
      },
    });
    return user;
  }

  async getAllUsers() {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
      },
    });

    return users;
  }

  async updateUser(id: number, newUser: UserDto) {
    const { password } = newUser;
    const hashedPassword = await this.hashPassword({ password });

    const user = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        email: newUser.email,
        name: newUser.name,
        password: hashedPassword,
      },
    });

    return user;
  }

  async deleteUser(id: number) {
    return this.prisma.user.delete({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
      },
    });
  }
}
