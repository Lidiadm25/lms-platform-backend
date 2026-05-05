import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ValidRoles } from '../interfaces/validRoles';

import { Task } from 'src/tasks/entities/task.entity';
import { Survey } from 'src/survey/entities/survey.entity';
import { UserProject } from 'src/user-projects/entities/user-project.entity';
import { Project } from 'src/project/entities/project.entity';
import { Grade } from 'src/grade/entities/grade.entity';
import { SurveyUser } from 'src/survey-user/entities/survey-user.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 100, unique: true })
  email!: string;
  @Column('text', {
    select: false,
  })
  password!: string;
  @Column('text')
  fullName!: string;

  @Column('bool', {
    default: true,
  })
  isActive!: boolean;

  @Column({
    type: 'set',
    enum: ValidRoles,
    default: [ValidRoles.user],
  })
  roles!: string[];

  @OneToMany(() => Project, (project) => project.author)
  projects?: Project[];

  @OneToMany(() => Task, (task) => task.user_author)
  tasks!: Task[];

  @OneToMany(() => Task, (task) => task.user_author)
  tasks_created!: Task[];

  @OneToMany(() => Survey, (survey) => survey.user_author)
  surveys!: Survey[];

  @OneToMany(()=> SurveyUser, response => response.user)
  response!:SurveyUser[];

  @OneToMany(() => Grade, (grade) => grade.teacher)
  grades_put!: Grade[];

  @OneToMany(() => Grade, (grade) => grade.student)
  grades_received!: Grade[];

  @OneToMany(() => UserProject, (userProject) => userProject.user)
  userProjects!: UserProject[];

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }
}
