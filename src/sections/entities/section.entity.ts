import { Lesson } from "src/lessons/entities/lesson.entity";
import { Project } from "src/project/entities/project.entity";

import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("sections")
export class Section {

    @PrimaryGeneratedColumn('uuid')
    id!:string;
    
    @Column({ type : "varchar", nullable: false, length: "50"})
    title!:string;
    @Column({ type : "varchar", nullable: false, length: "50"})
    description!: string;

    @ManyToOne(() => Project, (project) => project.units )
    project!:Project;

    @OneToMany( () => Lesson, (lesson) => lesson.unit, {cascade:true})
        lessons ?: Lesson[];
}
