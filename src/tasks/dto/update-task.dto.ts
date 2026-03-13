import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsDate, IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {

    @IsString()
    @IsOptional()
    id!:string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    title!: string;

    
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    description!: string;

    @IsDateString()
    @IsOptional()
    task_close!:Date;

    
    @IsDateString()
    @IsOptional()
    task_open!:Date;




}
