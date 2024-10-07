import { Module } from '@nestjs/common';
import { emailServices } from './emails.service';

@Module({
  providers: [emailServices],
  exports: [emailServices],
})
export class EmailServicesModule {}
