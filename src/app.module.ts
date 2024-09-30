import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from "../data-source";

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
