import { forwardRef, Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { Question } from './entities/question.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyModule } from 'src/survey/survey.module';
import { Survey } from 'src/survey/entities/survey.entity';

@Module({
  controllers: [QuestionController],
  providers: [QuestionService],
  imports: [TypeOrmModule.forFeature([Question]), forwardRef(()=> SurveyModule)],
  exports: [TypeOrmModule]
})
export class QuestionModule {}
