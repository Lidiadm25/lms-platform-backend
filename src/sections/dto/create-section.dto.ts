import { IsArray, IsString, MinLength } from "class-validator";

export class CreateSectionDto {
    @IsString()
    @MinLength(1)
    title!:string;

    @IsString()
    @MinLength(1)
    description!:string;
/*
    @IsString()
    project!:string;

    @IsString()
    @IsArray({ each: true})
    lessons!: string[];
    */

}
