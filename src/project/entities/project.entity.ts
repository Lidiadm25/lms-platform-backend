import { User } from "src/auth/entities/user.entity";
import { Grade } from "src/grade/entities/grade.entity";
import { Section } from "src/section/entities/section.entity";
import { Survey } from "src/survey/entities/survey.entity";
import { UserProject } from "src/user-projects/entities/user-project.entity";
import { AfterInsert, AfterUpdate, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("projects")
export class Project {

    @PrimaryGeneratedColumn('uuid')
    id!:string;

    @Column({ type : "varchar", nullable: false, length: "50"})
    title!:string;

    @ManyToOne(() => User, (user) => user.projects, {eager:true})
    author?:User;

    @Column({ type : "varchar", nullable: false, length: 100})
    description!:string;

    @Column({type: "integer", default:105, nullable:false}) // TODO: utilizarlo como horas en vez de días
    duration!:number;

    @OneToMany(() => Section, (unit)=> unit.project, {cascade:true, eager:true})
    units?: Section[];

    @ManyToOne(()=> Survey, (survey) => survey.projects)
    survey?:Survey;

    @OneToMany(()=> UserProject, (userProject) => userProject.project, {cascade:true})
    students !: UserProject[];

    @OneToMany(() => Grade, grades => grades.project)
    grades !: Grade[];

   
}
