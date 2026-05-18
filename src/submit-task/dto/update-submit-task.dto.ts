import { PartialType } from '@nestjs/mapped-types';
import { CreateSubmitTaskDto } from './create-submit-task.dto';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Files } from 'src/files/entities/file.entity';

export class UpdateSubmitTaskDto extends PartialType(CreateSubmitTaskDto) {
  @IsNotEmpty()
  @IsOptional()
  url_file!: Files[];
}
