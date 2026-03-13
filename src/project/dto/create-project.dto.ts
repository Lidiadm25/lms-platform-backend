import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNotEmpty, IsOptional, IsString, MinLength, ValidateNested } from "class-validator";
import { User } from "src/auth/entities/user.entity";
import { CreateSectionDto } from "src/section/dto/create-section.dto";
import { Section } from "src/section/entities/section.entity";


export class CreateProjectDto {

    @IsString()
    @MinLength(1)
    title!:string;
    
    @IsString()
    @MinLength(1)
    description!:string;

    

    @Type(() => CreateSectionDto)
    @ArrayMinSize(1)
    @ValidateNested()
    @IsOptional()
    units!:Section[];

   

    

}
