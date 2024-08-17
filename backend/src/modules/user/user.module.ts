import { Module } from '@nestjs/common';
import { UserService } from './shared/services/user.service';

@Module({
  providers: [UserService]
})
export class UserModule {}
