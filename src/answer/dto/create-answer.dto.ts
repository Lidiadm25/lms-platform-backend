import { IsNotEmpty, IsString, NotContains } from "class-validator";

export class CreateAnswerDto {
    @IsString()
    @IsNotEmpty()
    @NotContains(" ")
    questionId !:string
    
        @IsString()
    @IsNotEmpty()
    @NotContains(" ")
    type !: string;
}
