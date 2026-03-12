import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreateSubmitTaskDto {
@IsString()
@IsNotEmpty()
//@ IsUrl()
file_url !: string;

@IsString()
@IsNotEmpty()
taskId!: string;


}
