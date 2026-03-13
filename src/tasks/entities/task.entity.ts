import { User } from "src/auth/entities/user.entity";
import { Lesson } from "src/lesson/entities/lesson.entity";
import { SubmitTask } from "src/submit-task/entities/submit-task.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("tasks")
export class Task {

    @PrimaryGeneratedColumn('uuid')
    id!:string;

    @ManyToOne(() => User, (user) => user.tasks_created )
    user_author!:User;

    @Column()
    title!: string;
    @Column()
    description!: string;

    
    // status:string; enum o boolean

    @ManyToOne(()=> Lesson, (lesson) => lesson.tasks)
    lesson_task!:Lesson;

    @OneToMany(() => SubmitTask, (sub) => sub.task)
    submissions!: SubmitTask[];

    task_created!:Date;

    task_open!:Date;

    task_closed !:Date;

    active!:Boolean;


    

}
