import { Type } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class SubmitTaskInfo {
  @IsString()
  @IsNotEmpty()
  taskId!: string;

  @IsString()
  @IsNotEmpty()
  taskTitle!: string;

  @IsString()
  @IsNotEmpty()
  submitTaskId!: string;

  @IsDateString()
  @IsNotEmpty()
  start!: Date;

  @IsDateString()
  @IsNotEmpty()
  end!: Date;
}

export class SubmitTaskInfoResponse {
  @IsNumber()
  count!: number;

  @ValidateNested()
  @Type(() => SubmitTaskInfo)
  tasks!: SubmitTaskInfo[];
}
