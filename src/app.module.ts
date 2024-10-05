// app.module.ts
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { IamModule } from './iam/iam.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { IamController } from './iam/iam.controller';
import { IamService } from './iam/iam.service';
import { ConfirmationsModule } from './confirmations/confirmations.module';
import { ConfirmationsService } from './confirmations/confirmations.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UserModule, IamModule, ConfirmationsModule, PrismaModule],
  controllers: [UserController, IamController],
  providers: [UserService, IamService, ConfirmationsService],
})
export class AppModule {}
