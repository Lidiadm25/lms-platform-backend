import { Project } from "src/projects/entities/project.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("sections")
export class Section {

    @PrimaryGeneratedColumn('uuid')
    id!:string;

    duration_lesson !: number;

    description!: string;

    @ManyToOne(() => Project, (project) => project.units )
    project!:Project;
}
