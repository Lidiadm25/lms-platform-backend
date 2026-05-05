import { IsString, MinLength } from "class-validator";

export class NewMessageDto{
   
    room_id!: string;
    user_id!: string;
}