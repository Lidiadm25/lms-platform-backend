import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { ValidRoles } from '../interfaces/validRoles';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  email!: string;

  @IsString()
  password!: string;

  @IsString()
  @MinLength(1)
  fullName!: string;
  @IsString()
  @IsOptional()
  role!: ValidRoles;
}
