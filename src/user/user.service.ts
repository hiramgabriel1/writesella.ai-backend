import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { encryptPassword } from 'src/utils/password.encrypt';
// import { ConfirmationsService } from '../confirmations/confirmations.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

/**
 * this class is used to interact with the database and perform CRUD operations on the user table.
 */
@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,

    // private confirmationServices: ConfirmationsService,
  ) {}

  /**
   *
   * this method is used to check if a user exists in the database.
   *
   * @param email
   * @returns true or false
   */
  async isUserExists(email: string): Promise<boolean> {
    try {
      const find = await this.prisma.user.findFirst({ where: { email } });

      return find ? true : false;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   *
   * this method is used to register a new user.
   *
   * @param createUserDto
   * @returns
   */
  async registerUser(
    createUserDto: CreateUserDto,
  ): Promise<{ status: number; message: string; data: User | null }> {
    try {
      const searchUser = await this.isUserExists(createUserDto.email);

      if (searchUser) {
        return {
          status: 400,
          message: 'User already exists',
          data: null,
        };
      }

      const user = {
        ...createUserDto,
        password: await encryptPassword(createUserDto.password),
      };

      const saveUser = await this.prisma.user.create({
        data: user,
      });

      if (!saveUser) {
        return {
          status: 400,
          message: 'User not created',
          data: null,
        };
      }

      // ? send confirmation email to user
      // const sendConfirmation =
      //   await this.confirmationServices.sendConfirmAccountUser(user.email);

      // if (!sendConfirmation) {
      //   return {
      //     status: 400,
      //     message: 'User created but confirmation email not sent',
      //     data: saveUser,
      //   };
      // }

      return {
        status: 201,
        message: 'User created',
        data: saveUser,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}