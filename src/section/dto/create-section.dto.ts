import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsOptional, IsString, MinLength, ValidateNested } from "class-validator";
import { CreateLessonDto } from "src/lesson/dto/create-lesson.dto";

export class CreateSectionDto {
    @IsString()
    @MinLength(1)
    title!:string;

    @IsString()
    @MinLength(1)
    description!:string;
    
    @Type(() => CreateLessonDto)
    @IsOptional()
    @ValidateNested()
    lessons!: CreateLessonDto[];
    
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    project?:string;


}
