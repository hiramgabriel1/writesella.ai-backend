import { Module } from '@nestjs/common';
import { ConfirmationsService } from './confirmations.service';

@Module({
  providers: [ConfirmationsService],
})
export class ConfirmationsModule {}
