import { Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { Lesson } from './entities/lesson.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { SectionsModule } from 'src/section/sections.module';

@Module({
  controllers: [LessonsController],
  providers: [LessonsService],
  imports:[
    TypeOrmModule.forFeature([ Lesson ]),
    AuthModule,
    SectionsModule
  ],
  exports:[TypeOrmModule]
})
export class LessonsModule {}
