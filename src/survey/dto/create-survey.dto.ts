import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsNotEmpty, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import { CreateQuestionDto } from 'src/question/dto/create-question.dto';
import { Question } from 'src/question/entities/question.entity';

export class CreateSurveyDto {

  @IsNotEmpty()
  @IsUUID()
  idProject!:string;

  @Type(() => CreateQuestionDto)
  @ArrayMinSize(1)
  @ValidateNested({each:true})
  @IsArray()
 
  questions!: CreateQuestionDto[];
}
