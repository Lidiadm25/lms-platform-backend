import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubmitTask } from 'src/submit-task/entities/submit-task.entity';
import { SubmitTaskModule } from 'src/submit-task/submit-task.module';
import { LessonsModule } from 'src/lesson/lessons.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [
    TypeOrmModule.forFeature([Task]),
    LessonsModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  exports: [TypeOrmModule],
})
export class TasksModule {}
