import {
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  Min,
  NotContains,
} from 'class-validator';

export class CreateAnswerDto {
  @IsString()
  @IsNotEmpty()
  @NotContains(' ')
  questionsId!: string;

  @IsInt()
  @Min(0)
  @Max(5)
  rating!: number;
}
