import { Transform, Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsBoolean,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CreateCategoryDto } from 'src/category/dto/create-category.dto';

import { CreateSectionDto } from 'src/section/dto/create-section.dto';
import { Section } from 'src/section/entities/section.entity';

export class CreateProjectDto {
  @IsString()
  @MinLength(1)
  title!: string;

  @IsString()
  @MinLength(1)
  description!: string;

  @Type(() => CreateSectionDto)
  @ArrayMinSize(1)
  @ValidateNested()
  @IsOptional()
  units!: Section[];

  @Type(() => CreateCategoryDto)
  @IsString()
  category!: CreateCategoryDto;

  @Transform(
    ({ value }) =>
      value === 'true' || value === true || value === 1 || value === '1',
  )
  @IsBoolean()
  @IsOptional()
  isActive!: boolean;
}
