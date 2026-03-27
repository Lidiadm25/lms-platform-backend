import { PartialType } from '@nestjs/mapped-types';
import { CreateLessonDto } from './create-lesson.dto';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateLessonDto extends PartialType(CreateLessonDto) {
  @IsUUID()
  @IsString()
  @IsOptional()
  readonly id?: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description!:string;

  @IsString()
  @IsOptional()
  url_file!:string;

}
