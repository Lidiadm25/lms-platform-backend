import { Type } from 'class-transformer';
import {
  IsDate,
  IsOptional
} from 'class-validator';

export class UpdatedUserDtoProject {

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  end_date!: Date;
}
