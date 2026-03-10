import { User } from "src/auth/entities/user.entity";
import { Lesson } from "src/lessons/entities/lesson.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("tasks")
export class Task {

    @PrimaryGeneratedColumn('uuid')
    id!:string;

    @ManyToOne(() => User, (user) => user.tasks_created )
    user_author!:User;

    @ManyToOne(() => User, (user) => user.tasks )
    user_task!:User;


    url_file?:string;

    title!: string;

    grade!: string|number;
    // status:string; enum o boolean

    @ManyToOne(()=> Lesson, (lesson) => lesson.tasks)
    lesson_task!:Lesson;
    

}
