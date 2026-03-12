import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto } from './create-project.dto';
import { IsOptional, IsString, IsUUID, MinLength } from 'class-validator';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  @IsUUID()
  @IsString()
  @IsOptional()
  readonly id?: string;

  @IsString()
  @IsOptional()
  @MinLength(1)
  title?: string;

  @IsString()
  @IsOptional()
  @MinLength(1)
  readonly description?: string;
}
