import { PartialType } from '@nestjs/mapped-types';
import { CreateSectionDto } from './create-section.dto';
import {
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Lesson } from 'src/lesson/entities/lesson.entity';
import { CreateLessonDto } from 'src/lesson/dto/create-lesson.dto';
import { UpdateLessonDto } from 'src/lesson/dto/update-lesson.dto';

export class UpdateSectionDto extends PartialType(CreateSectionDto) {
  @IsUUID()
  @IsString()
  @IsOptional()
  readonly id?: string;

  @IsString()
  @MinLength(1)
  @IsOptional()
  readonly title?: string;

  @IsString()
  @IsOptional()
  @MinLength(1)
  readonly description?: string;
}
