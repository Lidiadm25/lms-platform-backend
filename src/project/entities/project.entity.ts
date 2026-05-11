import { User } from 'src/auth/entities/user.entity';
import { Category } from 'src/category/entities/category.entity';
import { Grade } from 'src/grade/entities/grade.entity';
import { Section } from 'src/section/entities/section.entity';
import { Survey } from 'src/survey/entities/survey.entity';
import { UserProject } from 'src/user-projects/entities/user-project.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', nullable: false, length: '50' })
  title!: string;

  @ManyToOne(() => User, (user) => user.projects)
  author?: User;

  @CreateDateColumn()
  created_at !:  Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  last_modified!: Date;

  @Column({type: 'varchar'})
  snippet!: string;

  @Column({ type: 'varchar', default: '' }) // placeholder
  image!: string;

  @Column({ type: 'longtext', nullable: false })
  description!: string;

  @Column({ type: 'integer', default: 105, nullable: false }) // TODO: utilizarlo como horas en vez de días
  duration!: number;

  @ManyToOne(() => Category, (category) => category.project)
  category!: Category;

  @OneToMany(() => Section, (unit) => unit.project, {
    cascade: true,
    eager: true,
  })
  units?: Section[];

  @OneToOne(() => Survey, (survey) => survey.projects, {
    cascade: true,
    nullable: true,
  })
  survey?: Survey;

  @OneToMany(() => UserProject, (userProject) => userProject.project, {
    cascade: true,
  })
  students!: UserProject[];

  @OneToMany(() => Grade, (grades) => grades.project)
  grades!: Grade[];

  @Column({ type: 'boolean', default: false })
  isActive!: boolean;
}
