import { PartialType } from '@nestjs/mapped-types';
import { CreateGradeDto } from './create-grade.dto';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateGradeDto extends PartialType(CreateGradeDto) {
  @IsString()
  @IsNotEmpty()
  taskSubmitId!: string;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  total!: number;
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  min_range!: number;
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  max_range!: number;
}
