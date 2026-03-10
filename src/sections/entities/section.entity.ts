import { Lesson } from "src/lessons/entities/lesson.entity";
import { Project } from "src/project/entities/project.entity";

import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("sections")
export class Section {

    @PrimaryGeneratedColumn('uuid')
    id!:string;
    
    title!:string;
    description!: string;

    @ManyToOne(() => Project, (project) => project.units )
    project!:Project;

    @OneToMany( () => Lesson, (lesson) => lesson.unit)
        lessons ?: Lesson[];
}
