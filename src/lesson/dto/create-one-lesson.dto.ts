import { IsString } from 'class-validator';

export class CreateOneLessonDto {
  @IsString()
  title!: string;

  @IsString()
  unit!: string;

  @IsString()
  description!: string;

  //task?:string; // id del task
}
