import { IsNotEmpty, IsString } from 'class-validator';

export class UserDtoProject {
  @IsString()
  @IsNotEmpty()
  userId!: string;
  @IsString()
  @IsNotEmpty()
  projectId!: string;
}
