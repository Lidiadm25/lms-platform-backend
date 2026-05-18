import { Type } from 'class-transformer';
import { User } from 'src/auth/entities/user.entity';
import { Project } from 'src/project/entities/project.entity';
import { SubmitTask } from 'src/submit-task/entities/submit-task.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('grades')
export class Grade {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, (user) => user.grades_put)
  teacher!: User;

  @ManyToOne(() => User, (user) => user.grades_received)
  student!: User;

  @OneToOne(() => SubmitTask, (sub) => sub.grade, { onDelete: 'CASCADE' })
  @JoinColumn() // owns the relationship
  taskSubmitted!: SubmitTask;

  @ManyToOne(() => Project, (project) => project.grades)
  project!: Project;
  @Column('int')
  total!: number;
  @Column('int', { default: 0 })
  min_range!: number;
  @Column('int', { default: 10 })
  max_range!: number;

  @Column('varchar')
  feedback!: string;
}
