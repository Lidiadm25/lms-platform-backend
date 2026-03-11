import { PartialType } from '@nestjs/mapped-types';
import { CreateSectionDto } from './create-section.dto';
import { IsOptional, IsString, IsUUID, MinLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Lesson } from 'src/lessons/entities/lesson.entity';
import { CreateLessonDto } from 'src/lessons/dto/create-lesson.dto';
import { UpdateLessonDto } from 'src/lessons/dto/update-lesson.dto';

export class UpdateSectionDto extends PartialType(CreateSectionDto) {

    @IsUUID()
    @IsString()
    @IsOptional()
    readonly id?:string;

    @IsString()
    @MinLength(1)
    @IsOptional()
    readonly title?:string;
    
    @IsString()
    @IsOptional()
    @MinLength(1)
    readonly description?:string;

}
