import { Type } from "class-transformer";
import { IsArray, IsOptional, IsString, MinLength, ValidateNested } from "class-validator";
import { CreateLessonDto } from "src/lessons/dto/create-lesson.dto";
import { Lesson } from "src/lessons/entities/lesson.entity";
import { CreateProjectDto } from "src/project/dto/create-project.dto";
import { Project } from "src/project/entities/project.entity";

export class CreateSectionDto {
    @IsString()
    @MinLength(1)
    title!:string;

    @IsString()
    @MinLength(1)
    description!:string;


    @IsString()
    project?:string;


    
    @Type(() => CreateLessonDto)
    @IsOptional()
    @ValidateNested()
    lessons!: Lesson[];
    

}
