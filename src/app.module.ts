import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

import { LessonsModule } from './lesson/lessons.module';

import { SectionsModule } from './section/sections.module';
import { TasksModule } from './tasks/tasks.module';

import { SurveyModule } from './survey/survey.module';
import { QuestionModule } from './question/question.module';
import { AnswerModule } from './answer/answer.module';
import { UsersProjectsModule } from './user-projects/users-projects.module';
import { ProjectModule } from './project/project.module';
import { SubmitTaskModule } from './submit-task/submit-task.module';
import { GradeModule } from './grade/grade.module';
import { CategoryModule } from './category/category.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    ConfigModule.forRoot(),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT!,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    LessonsModule,
    SectionsModule,
    TasksModule,
    SurveyModule,
    QuestionModule,
    AnswerModule,
    UsersProjectsModule,
    ProjectModule,
    AuthModule,
    SubmitTaskModule,
    GradeModule,
    CategoryModule,

    ServeStaticModule.forRoot({ 
      rootPath: join(__dirname,'..','public'),
    }),

    FilesModule 
  ],
})
export class AppModule {}
