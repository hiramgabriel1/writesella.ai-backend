// app.module.ts
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { IamModule } from './iam/iam.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { IamController } from './iam/iam.controller';
import { IamService } from './iam/iam.service';
import { EmailServicesModule } from './emailsServices/emails.services.module';
import { emailServices } from './emailsServices/emails.service';
import { PrismaModule } from './prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UserModule, IamModule, EmailServicesModule, PrismaModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [UserController, IamController],
  providers: [UserService, IamService, emailServices],
})
export class AppModule { }
