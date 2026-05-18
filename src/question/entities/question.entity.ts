import { Answer } from 'src/answer/entities/answer.entity';

import { Survey } from 'src/survey/entities/survey.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar', { nullable: false })
  title!: string;

  @ManyToOne(() => Survey, (survey) => survey.questions)
  survey!: Survey;

  @OneToMany(() => Answer, (answer) => answer.questions)
  answers!: Answer[];
}
