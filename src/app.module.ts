import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config'; 
import { AuthModule } from './auth/auth.module';
import { CursosModule } from './cursos/cursos.module';
import { LessonsModule } from './lessons/lessons.module';
import { UnitsModule } from './units/units.module';
import { SectionsModule } from './sections/sections.module';
import { TasksModule } from './tasks/tasks.module';
import { CategoriesModule } from './categories/categories.module';



@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
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
    CursosModule,
    LessonsModule,
    UnitsModule,
    SectionsModule,
    TasksModule,
    CategoriesModule,
    
        
  ],
 
})
export class AppModule {


  

}
