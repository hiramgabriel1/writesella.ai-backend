import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.registerUser(createUserDto);
  }

  @Patch("/confirm-account/:token")
  confirmAccount(@Param('token') token: string) {
    return this.userService.confirmAccount(token);
  }z
}