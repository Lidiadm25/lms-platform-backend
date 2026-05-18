import { User } from 'src/auth/entities/user.entity';
import { Project } from 'src/project/entities/project.entity';

import { Question } from 'src/question/entities/question.entity';
import { SurveyUser } from 'src/survey-user/entities/survey-user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('surveys')
export class Survey {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, (user) => user.surveys)
  user_author!: User;

  @OneToMany(() => Question, (question) => question.survey, { cascade: true })
  questions!: Question[];

  @OneToMany(() => SurveyUser, (response) => response.survey)
  responses!: SurveyUser[];

  @OneToOne(() => Project, (project) => project.survey)
  @JoinColumn()
  projects!: Project;

  @Column('varchar', { nullable: false, default: 'Satisfaction survey' })
  title!: string;
}
