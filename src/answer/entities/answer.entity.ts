import { Question } from 'src/question/entities/question.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TypesAnswers } from '../interfaces/types-answers';
import { SurveyUser } from 'src/survey-user/entities/survey-user.entity';

@Entity('answers')
export class Answer {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Question, (question) => question.answers)
  questions!: Question;

  @Column('int')
  rating!: number;
  
  @ManyToOne(()=> SurveyUser, response => response.answers)
  response!: SurveyUser;
}
