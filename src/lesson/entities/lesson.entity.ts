import { InjectRepository } from '@nestjs/typeorm';
import { Section } from 'src/section/entities/section.entity';
import { Task } from 'src/tasks/entities/task.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('lessons')
export class Lesson {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', nullable: true, length: '150' })
  url_file?: string;
  @Column({ type: 'varchar', nullable: false, length: '50' })
  title!: string;

  @ManyToOne(() => Section, (section) => section.lessons, {
    onDelete: 'CASCADE',
  })
  unit!: Section;

  @OneToMany(() => Task, (tasks) => tasks.lesson_task, { cascade: true })
  tasks!: Task[];
}
