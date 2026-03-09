import { User } from "src/auth/entities/user.entity";
import { Lesson } from "src/lessons/entities/lesson.entity";
import { Section } from "src/sections/entities/section.entity";
import { Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("projects")
export class Project {

    @PrimaryGeneratedColumn('uuid')
    id!:string;

    title!:string;

    @ManyToOne(() => User, (user) => user.projects)
    author!:User;

    description!:string;

    duration!:number;

    @ManyToOne(() => Section, (unit)=> unit.project)
    units?: Section[];

   // category!:Category;
}
