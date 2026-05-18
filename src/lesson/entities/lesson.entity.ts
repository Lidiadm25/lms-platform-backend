import { InjectRepository } from '@nestjs/typeorm';
import { Files } from 'src/files/entities/file.entity';
import { Section } from 'src/section/entities/section.entity';
import { Task } from 'src/tasks/entities/task.entity';
import {
  AfterInsert,
  AfterUpdate,
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

  @OneToMany(() => Files, (file) => file.lesson)
  url_file?: Files[];
  @Column({ type: 'varchar', nullable: false, length: '50' })
  title!: string;
  @Column({ type: 'longtext', nullable: true })
  description!: string;

  @ManyToOne(() => Section, (section) => section.lessons, {
    onDelete: 'CASCADE',
  })
  unit!: Section;

  @OneToMany(() => Task, (tasks) => tasks.lesson_task, { cascade: true })
  tasks!: Task[];

  // @AfterUpdate()
  //   @AfterInsert()
  //   updateLastModified(){
  //     this.unit.project.last_modified = new Date();
  //    }
}
