import { Answer } from 'src/answer/entities/answer.entity';
import { User } from 'src/auth/entities/user.entity';
import { Survey } from 'src/survey/entities/survey.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('SurveyUser')
export class SurveyUser {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, (user) => user.response)
  user!: User;

  @ManyToOne(() => Survey, (survey) => survey.responses, {onDelete:'CASCADE'})
  survey!: Survey;

  @OneToMany(() => Answer, (answer) => answer.response, { cascade: true })
  answers!: Answer[];

  @Column({ type: 'int' })
  total!: number;
}
