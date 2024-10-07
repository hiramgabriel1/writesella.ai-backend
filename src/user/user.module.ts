import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { EmailServicesModule } from '../emailsServices/emails.services.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { emailServices } from 'src/emailsServices/emails.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, emailServices],
  imports: [EmailServicesModule],
})
export class UserModule {}
