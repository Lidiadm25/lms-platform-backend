import { Question } from 'src/question/entities/question.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TypesAnswers } from '../interfaces/types-answers';

@Entity('answers')
export class Answer {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @OneToMany(() => Question, (question) => question.answers)
  questions!: Question[];

  @Column({
    type: 'set',
    enum: TypesAnswers,
    default: [TypesAnswers.checkbox],
  })
  type!: string[];
}
