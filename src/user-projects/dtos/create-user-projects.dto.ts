import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserDtoProject {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  userId!: string;
  @IsString()
  @IsNotEmpty()
  projectId!: string;

  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  userEmail!: string;
}
