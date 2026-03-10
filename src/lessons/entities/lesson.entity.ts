import { Section } from "src/sections/entities/section.entity";
import { Task } from "src/tasks/entities/task.entity";
import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("lessons")
export class Lesson {
    @PrimaryGeneratedColumn('uuid')
        id!:string;


    url_file?:string;

    title!:string;

    @ManyToOne(() => Section, (section) => section.lessons )
        unit!:Section;

    @OneToMany(() => Task, (tasks) => tasks.lesson_task)
    tasks!:Task[];
}
