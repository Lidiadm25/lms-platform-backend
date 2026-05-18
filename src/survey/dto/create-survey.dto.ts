import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
  ValidateNested
} from 'class-validator';
import { CreateQuestionDto } from 'src/question/dto/create-question.dto';

export class CreateSurveyDto {
  @IsNotEmpty()
  @IsString()
  projectsId!: string;

  @Type(() => CreateQuestionDto)
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @IsArray()
  questions!: CreateQuestionDto[];
}
