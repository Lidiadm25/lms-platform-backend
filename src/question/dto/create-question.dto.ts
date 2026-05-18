import { IsNotEmpty, IsOptional, IsString, NotContains } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  @NotContains('  ')
  title!: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  surveyId!: string;
}
