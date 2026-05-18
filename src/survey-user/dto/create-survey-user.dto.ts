import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateAnswerDto } from 'src/answer/dto/create-answer.dto';

export class CreateSurveyUserDto {
  @IsString()
  @IsNotEmpty()
  surveyId!: string;

  @Type(() => CreateAnswerDto)
  @ValidateNested()
  @ArrayMinSize(1)
  answers!: CreateAnswerDto[];
}
