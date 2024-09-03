import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { FavoriteModule } from './modules/favorite/favorite.module';
import { UtilsModule } from './modules/utils/utils.module';



@Module({
  imports: [
    UserModule,
    AuthModule,
    FavoriteModule,
    UtilsModule,
    ConfigModule.forRoot({isGlobal: true})
  ],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}
