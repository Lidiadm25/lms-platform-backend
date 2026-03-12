import { IsOptional, IsString, IsUUID } from "class-validator";
import { Section } from "src/sections/entities/section.entity";

export class CreateOneLessonDto {

    @IsString()
    title!:string;
    
    @IsString()
    unit!:string; 

    //task?:string; // id del task
}
