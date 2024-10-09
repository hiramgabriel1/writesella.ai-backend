import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { encryptPassword } from 'src/utils/password.encrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { EmailServices } from 'src/emailsServices/emails.service';
import { JwtService } from '@nestjs/jwt';
import { CONST_CONFIRM_ACCOUNT_SUBJECT, CONST_CONFIRM_ACCOUNT_TEXT } from 'src/utils/templetesEmails/confirmAccount/confirmAccount.const';
import { CONFIRM_ACCOUNT } from 'src/utils/templetesEmails/confirmAccount/confirmAccount';
import { UpdateUserDto } from './dto/update-user.dto';

/**
 * this class is used to interact with the database and perform CRUD operations on the user table.
 */
@Injectable()
export class UserService {

  constructor(
    private prisma: PrismaService,
    private emailService: EmailServices,
    private jwtService: JwtService
  ) { }

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
        isActive: false
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

      const token = await this.jwtService.signAsync(
        { email: user.email },
        { secret: process.env.SECRET }
      );
      


      const sendConfirmation = await this.emailService.sendEmail(
        CONST_CONFIRM_ACCOUNT_SUBJECT,
        CONFIRM_ACCOUNT(user.firstName, token),
        user.email,
        CONST_CONFIRM_ACCOUNT_TEXT
      );//send user email and token  to incrase security

      if (!sendConfirmation) {
        return {
          status: 400,
          message: 'User created but confirmation email not sent',
          data: saveUser,
        };
      }

      return {
        status: 201,
        message: 'User created',
        data: saveUser,
      };
    } catch (error) {
      throw new Error(error);
    }
  }


  async confirmAccount(token: string) {
    try {
      if (!token) {
        return {
          status: 500,
          message: "token is necesary",
          data: null
        }
      }

      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.SECRET,
      });

      if (!payload.email) {
        return {
          status: 500,
          message: "token is invalid",
          data: null
        }
      }

      const user = await this.isUserExists(payload.email);

      if (!user) {
        return {
          status: 404,
          message: "user not found",
          data: null
        }
      }

      const updated = await this.prisma.user.update({
        where: {
          email: payload.email
        },
        data: {
          isActive: true
        }
      })

      if (!updated) {
        return {
          status: 500,
          message: "Internal server error",
          data: null
        }
      }
      return {
        status: 200,
        message: "user activated",
        data: updated
      }

    } catch (error) {
      throw new Error(error)
    }
  }

  async updateUser(userId: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: userId
        }
      })
  
      if(!user){
        return{
          status:404,
          message:"User not found",
          data:null
        }
      }
  
      const updated = await this.prisma.user.update({
        where:{
          id:userId
        },
        data:{
          ...updateUserDto
        }
      })
  
      if(!updated){
        return {
          status: 500,
          message:"Internal server error",
          data:null
        }
      }
  
      return {
        status: 200,
        message: "User updated",
        data: updated
      }
    } catch (error) {
        throw new Error(error)
    }
  }
}