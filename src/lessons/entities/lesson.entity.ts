import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("lessons")
export class Lesson {
    @PrimaryGeneratedColumn('uuid')
        id!:string;


    url_file!:string;

    
}
