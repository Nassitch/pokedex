import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaExceptionFilter } from './common/filters/prisma-exception.filter';
import { PrismaInterceptor } from './common/interceptors/prisma.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalFilters(new PrismaExceptionFilter());
  app.useGlobalInterceptors(new PrismaInterceptor());
  await app.listen(3000);
}
bootstrap();
