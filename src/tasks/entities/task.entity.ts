import { BadRequestException } from '@nestjs/common';
import { User } from 'src/auth/entities/user.entity';
import { Lesson } from 'src/lesson/entities/lesson.entity';
import { SubmitTask } from 'src/submit-task/entities/submit-task.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, (user) => user.tasks_created)
  user_author!: User;

  @Column()
  title!: string;
  @Column()
  description!: string;

  @ManyToOne(() => Lesson, (lesson) => lesson.tasks, { onDelete: 'CASCADE' })
  lesson_task!: Lesson;

  @OneToMany(() => SubmitTask, (sub) => sub.task, { cascade: true })
  submissions!: SubmitTask[];

  @Column('datetime', { nullable: true })
  task_created!: Date;

  @Column('datetime', { nullable: true })
  task_open!: Date;

  @Column('datetime', { nullable: true })
  task_close!: Date;

  @BeforeInsert()
  updateDates() {
    this.task_created = new Date();
  }

  @BeforeUpdate()
  @BeforeInsert()
  verifyDates(){
    if(this.task_open && this.task_close){

      if(this.task_open > this.task_close){
        throw new BadRequestException(`Task dates`)
      }
    }
  }


  getActive(): boolean {
    if (this.task_close == null) {
      return true;
    }

    if (new Date().getDate == this.task_close.getDate) {
      return false;
    }
    return true;
  }
}
