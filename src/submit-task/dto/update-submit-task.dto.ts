import { PartialType } from '@nestjs/mapped-types';
import { CreateSubmitTaskDto } from './create-submit-task.dto';

export class UpdateSubmitTaskDto extends PartialType(CreateSubmitTaskDto) {}
