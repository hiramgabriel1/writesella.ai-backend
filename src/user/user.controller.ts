import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

/**
 * This class is used to interact white the  user entity.
 */

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * This endpoint is used to register a user
   * @param createUserDto 
   * @return if user is created return user else return error
   */
  @Post('/register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.registerUser(createUserDto);
  }

  /**
   * This endpoint is used to activate account (verify email)
   * @param token 
   * @returns if  account is activated return user else return error
   */
  @Patch("/confirm-account/:token")
  confirmAccount(@Param('token') token: string) {
    return this.userService.confirmAccount(token);
  }


  /**
   * This endpoint is used to register a user
   * @param updateUserDto 
   * @return if user is updated return user else return error
   */
  @Patch("/:userId")
  updateUser(
    @Param('userId') userId: number,
    @Body() updateUserDto:UpdateUserDto) {
    return this.userService.updateUser(userId,updateUserDto)
  }
}