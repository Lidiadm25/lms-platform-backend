import { User } from "src/auth/entities/user.entity";
import { Grade } from "src/grade/entities/grade.entity";
import { Task } from "src/tasks/entities/task.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("submit")
export class SubmitTask {
    @PrimaryGeneratedColumn('uuid')
    id!:string;

    @ManyToOne(() => User )
    student!:User;

    @Column()
    url_file?:string;

    @OneToOne(() => Grade, (grade) => grade.taskSubmitted)
    grade!:Grade;

    @ManyToOne( () => Task, (task) => task.submissions)
    @JoinColumn()
    task!: Task;


    @Column("date" , {nullable:true})
    date_send!:Date;
    @Column("int")
    left_time!:number;



}
