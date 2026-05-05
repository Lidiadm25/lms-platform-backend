import { PartialType } from '@nestjs/swagger';
import { CreateSurveyUserDto } from './create-survey-user.dto';

export class UpdateSurveyUserDto extends PartialType(CreateSurveyUserDto) {}
