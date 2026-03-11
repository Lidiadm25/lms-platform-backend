import { Type } from "class-transformer";
import { IsArray, IsString, MinLength, ValidateNested } from "class-validator";
import { CreateLessonDto } from "src/lessons/dto/create-lesson.dto";
import { Lesson } from "src/lessons/entities/lesson.entity";

export class CreateSectionDto {
    @IsString()
    @MinLength(1)
    title!:string;

    @IsString()
    @MinLength(1)
    description!:string;


    
    @Type(() => CreateLessonDto)
    @ValidateNested()
    lessons!: Lesson[];
    

}
