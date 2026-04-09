import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsBoolean,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CreateCategoryDto } from 'src/category/dto/create-category.dto';
import { Category } from 'src/category/entities/category.entity';
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
  
  @IsString()
  @IsOptional()
  image!: string;

  @Type(() => CreateCategoryDto)
  @IsString()
  category!: CreateCategoryDto;

  @IsBoolean()
  @IsOptional()
  isActive!: boolean;


}
