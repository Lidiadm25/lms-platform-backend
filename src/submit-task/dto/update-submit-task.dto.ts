import { PartialType } from '@nestjs/mapped-types';
import { CreateSubmitTaskDto } from './create-submit-task.dto';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateSubmitTaskDto extends PartialType(CreateSubmitTaskDto) {

  
  @IsNotEmpty()
  @IsOptional()
  url_file!: string[];
}
