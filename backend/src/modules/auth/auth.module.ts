import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRET_KEY,
    signOptions: {expiresIn: "1800s"}
  })],
  controllers: [AuthController],
  providers: [AuthService, PrismaService]
})
export class AuthModule {}
