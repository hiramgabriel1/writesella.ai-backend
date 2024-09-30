import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ConfirmationsService } from 'src/confirmations/confirmations.service';

@Module({
  controllers: [UserController],
  providers: [UserService, ConfirmationsService],
})
export class UserModule {}
