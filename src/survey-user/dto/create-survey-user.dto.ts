import { IsNotEmpty, IsString, NotContains } from "class-validator";

export class CreateSurveyUserDto {
    @IsString()
    @IsNotEmpty()
    idSurvey !: string;

}
