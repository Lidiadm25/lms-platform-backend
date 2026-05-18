import { Question } from 'src/question/entities/question.entity';
import { SurveyUser } from 'src/survey-user/entities/survey-user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity('answers')
export class Answer {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Question, (question) => question.answers, {
    cascade: ['insert'],
  })
  questions!: Question;

  @Column('int')
  rating!: number;

  @ManyToOne(() => SurveyUser, (response) => response.answers)
  response!: SurveyUser;
}
