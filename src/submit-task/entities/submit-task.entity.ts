import { User } from "src/auth/entities/user.entity";
import { Task } from "src/tasks/entities/task.entity";
import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export class SubmitTask {
     @PrimaryGeneratedColumn('uuid')
        id!:string;

    @ManyToOne(() => User )
     student!:User;

    @Column()
    url_file?:string;

    @Column({nullable: true})
    grade!:number;

    @ManyToOne( () => Task)
    task!: Task;
}
