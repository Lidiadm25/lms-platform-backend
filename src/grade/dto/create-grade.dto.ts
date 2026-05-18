import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateGradeDto {
  @IsString()
  @IsNotEmpty()
  taskSubmitId!: string;

  @IsNumber()
  @IsNotEmpty()
  total!: number;
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  min_range!: number;
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  max_range!: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  feedback!: string;
}
