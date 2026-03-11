import { Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { Lesson } from './entities/lesson.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [LessonsController],
  providers: [LessonsService],
  imports:[
    TypeOrmModule.forFeature([ Lesson ]),
    AuthModule
  ]
})
export class LessonsModule {}
