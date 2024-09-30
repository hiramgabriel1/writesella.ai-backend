import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

/**
 * this dto is to update a user.
 */
export class UpdateUserDto extends PartialType(CreateUserDto) {}
