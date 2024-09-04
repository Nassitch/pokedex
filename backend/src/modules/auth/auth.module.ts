import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { PrismaExceptionFilter } from 'src/common/filters/prisma-exception.filter';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { PrismaInterceptor } from 'src/common/interceptors/prisma.interceptor';

@Module({
  imports: [JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRET_KEY,
    signOptions: { expiresIn: "180s" },
  })],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtStrategy,
    {
      provide: APP_FILTER,
      useClass: PrismaExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: PrismaInterceptor,
    },
  ]
})
export class AuthModule {}
