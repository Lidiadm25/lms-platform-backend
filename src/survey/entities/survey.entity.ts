import { User } from "src/auth/entities/user.entity";
import { Project } from "src/project/entities/project.entity";

import { Question } from "src/question/entities/question.entity";
import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("surveys")
export class Survey {

    @PrimaryGeneratedColumn('uuid')
    id!:string;

    @ManyToOne(()=> User, (user) => user.surveys)
    user_author!: User;

    @OneToMany(() => Question, (question)=> question.survey)
    questions!:Question[];

    @OneToMany(()=> Project, (project) => project.survey)
    projects!:Project[];
}
