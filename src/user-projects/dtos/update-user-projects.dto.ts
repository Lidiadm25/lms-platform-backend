import { Type } from "class-transformer";
import { IsDate, IsDateString, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdatedUserDtoProject{
    


    // recibe todo
    // todo custom decorator
    
    @Type(() => Date)
    @IsDate()
    @IsOptional()
    end_date!: Date;
}