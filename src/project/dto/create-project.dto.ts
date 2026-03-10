import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsString, MinLength, ValidateNested } from "class-validator";
import { User } from "src/auth/entities/user.entity";
import { CreateSectionDto } from "src/sections/dto/create-section.dto";
import { Section } from "src/sections/entities/section.entity";


export class CreateProjectDto {

    @IsString()
    @MinLength(1)
    title!:string;

    @IsString()
    @MinLength(1)
    author!:User;
    
    @IsString()
    @MinLength(1)
    description!:string;

    
    @IsArray({
        each: true
    })
    @Type(() => CreateSectionDto)
    @ArrayMinSize(1)
    @ValidateNested()
    units!:Section[];


    

}
