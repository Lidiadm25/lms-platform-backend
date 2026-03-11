import { IsOptional, IsString } from "class-validator";
import { Section } from "src/sections/entities/section.entity";

export class CreateLessonDto {

    @IsString()
    title!:string;
    
    @IsString()
    unit!:string; 

    //task?:string; // id del task
}
