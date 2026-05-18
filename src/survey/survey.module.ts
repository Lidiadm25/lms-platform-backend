import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ProjectModule } from 'src/project/project.module';
import { QuestionModule } from 'src/question/question.module';
import { Survey } from './entities/survey.entity';
import { SurveyController } from './survey.controller';
import { SurveyService } from './survey.service';

@Module({
  controllers: [SurveyController],
  providers: [SurveyService],
  imports: [
    TypeOrmModule.forFeature([Survey]),
    AuthModule,
    ProjectModule,
    forwardRef(() => QuestionModule),
  ],
  exports: [TypeOrmModule],
})
export class SurveyModule {}
