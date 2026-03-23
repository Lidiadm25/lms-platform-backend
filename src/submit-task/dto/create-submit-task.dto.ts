import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateSubmitTaskDto {
  @IsString()
  @IsNotEmpty()
  //@ IsUrl()
  url_file!: string;

  @IsString()
  @IsNotEmpty()
  taskId!: string;
}
