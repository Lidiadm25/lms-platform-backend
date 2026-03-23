import { IsOptional, IsString, IsUUID } from 'class-validator';
import { Section } from 'src/section/entities/section.entity';

export class CreateOneLessonDto {
  @IsString()
  title!: string;

  @IsString()
  unit!: string;

  //task?:string; // id del task
}
