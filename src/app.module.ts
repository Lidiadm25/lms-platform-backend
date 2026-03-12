import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config'; 
import { AuthModule } from './auth/auth.module';

import { LessonsModule } from './lessons/lessons.module';

import { SectionsModule } from './sections/sections.module';
import { TasksModule } from './tasks/tasks.module';

import { SurveyModule } from './survey/survey.module';
import { QuestionModule } from './question/question.module';
import { AnswerModule } from './answer/answer.module';
import { UsersProjectsModule } from './user-projects/users-projects.module';
import { ProjectModule } from './project/project.module';
import { SubmitTaskModule } from './submit-task/submit-task.module';





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
    

    
        
  ],

 
})
export class AppModule {


  

}
