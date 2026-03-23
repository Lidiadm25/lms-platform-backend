import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateLessonDto {
  @IsString()
  title!: string;
}
