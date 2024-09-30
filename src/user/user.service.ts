import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { encryptPassword } from 'src/utils/password.encrypt';
import { ConfirmationsService } from 'src/confirmations/confirmations.service';

/**
 * this class is used to interact with the database and perform CRUD operations on the user table.
 */
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    private confirmationServices: ConfirmationsService,
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
      const find = await this.userRepository.findOne({ where: { email } });

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
  async registerUser(createUserDto: CreateUserDto): Promise<{status: number, message: string, data: UserEntity}> {
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

      const createUserInstance = this.userRepository.create(user);
      const userRegistered = await this.userRepository.save(createUserInstance);

      if (!userRegistered) {
        return {
          status: 400,
          message: 'User not created',
          data: null,
        };
      }

      // ? send confirmation email to user
      const sendConfirmation =
        await this.confirmationServices.sendConfirmAccountUser(
          userRegistered.email,
        );

      if(!sendConfirmation) {
        return {
          status: 400,
          message: 'User created but confirmation email not sent',
          data: null
        };
      }

      return {
        status: 201,
        message: 'User created',
        data: userRegistered,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}