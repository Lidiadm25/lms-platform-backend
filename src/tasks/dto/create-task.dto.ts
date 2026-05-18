import {
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsString()
  @IsNotEmpty()
  lesson!: string;

  @IsDateString()
  task_open!: Date;
  @IsDateString()
  task_close!: Date;

  @IsString()
  idProject!: string;

  @IsNumber()
  fileSize!: number;
}
