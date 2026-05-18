import { url } from 'inspector';
import { Lesson } from 'src/lesson/entities/lesson.entity';
import { SubmitTask } from 'src/submit-task/entities/submit-task.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('files')
export class Files {
  @PrimaryGeneratedColumn('uuid')
  id!: string;
  @Column()
  originalName!: string;
  @Column()
  key!: string;
  @Column()
  mimeType!: string;
  @Column({ type: 'int' })
  size!: number;
  @CreateDateColumn()
  createdAt!: Date;

  url?: string;

  @ManyToOne(() => Lesson, (lesson) => lesson.url_file, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  lesson!: Lesson;
  @ManyToOne(() => SubmitTask, (lesson) => lesson.url_file, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  submit?: SubmitTask;
}
