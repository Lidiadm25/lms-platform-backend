import { Answer } from 'src/answer/entities/answer.entity';
import { Survey } from 'src/survey/entities/survey.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Survey, (survey) => survey.questions)
  survey!: Survey;

  @ManyToOne(() => Answer, (answer) => answer.questions)
  answers!: Answer;
}
