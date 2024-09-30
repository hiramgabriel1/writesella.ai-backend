import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from "../data-source";
import { IamModule } from './iam/iam.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { IamController } from './iam/iam.controller';
import { IamService } from './iam/iam.service';
import { ConfirmationsModule } from './confirmations/confirmations.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    UserModule,
    IamModule,
    ConfirmationsModule,
  ],
  controllers: [UserController, IamController],
  providers: [UserService, IamService],
})
export class AppModule {}
