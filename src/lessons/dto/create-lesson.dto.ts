import { IsString } from "class-validator";

export class CreateLessonDto {

    @IsString()
    title!:string;
    

    //unit!:string; // utilizo el título por ahora

    //task?:string; // id del task
}
