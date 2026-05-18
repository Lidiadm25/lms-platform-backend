import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateSubmitTaskDto {
  @IsString()
  @IsNotEmpty()
  taskId!: string;
}
