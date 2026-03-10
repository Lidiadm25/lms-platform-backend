import { User } from "src/auth/entities/user.entity";
import { Project } from "src/projects/entities/project.entity";
import { AfterInsert, AfterLoad, AfterUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("users_projects")
export class UserProject {

    @PrimaryGeneratedColumn('uuid')
    id!:string;

    @ManyToOne (() => User, (users) => users.userProjects)
    user!:User;

    @ManyToOne(()=> Project, (project) => project.userProjects)
    project!: Project;

    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    start_date !: string;

    @Column({ type : "date"})
    end_date ?: Date;
    
    @AfterLoad()
    @AfterInsert()
    @AfterUpdate()
    calculateDurationProject(){
        let fecha_inicio:Date = new Date(this.start_date);
        fecha_inicio.setDate(fecha_inicio.getDate() + this.project.duration);

        this.end_date = fecha_inicio;
    }
    
}
