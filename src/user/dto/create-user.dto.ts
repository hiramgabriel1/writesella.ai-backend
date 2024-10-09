import { IsString, IsNotEmpty, IsEmail, Length, IsBoolean, IsOptional, IsDate, IsNumber } from 'class-validator';

/**
 * this class is used to validate the data that is sent to the server when creating a new user.
 */
export class CreateUserDto {
  @IsString({ message: 'First name must be a string' })
  @IsNotEmpty()
  @Length(1, 30)
  firstName: string;

  @IsString({ message: 'Last name must be a string' })
  @IsNotEmpty()
  @Length(1, 30)
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  @Length(1, 50)
  email: string;

  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty()
  @Length(6, 255)
  password: string;

  @IsString({ message: 'Role must be a string' })
  @IsNotEmpty()
  @Length(1, 20)
  role: string;

  @IsBoolean()
  @IsOptional()
  isMemberTeam?: boolean;

  @IsString({ message: 'Team must be a string' })
  @IsOptional()
  @Length(0, 255)
  team?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean ;
}