import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubmitTask } from 'src/submit-task/entities/submit-task.entity';
import { SubmitTaskModule } from 'src/submit-task/submit-task.module';
import { LessonsModule } from 'src/lesson/lessons.module';
import { PassportModule } from '@nestjs/passport';
import { UserProject } from 'src/user-projects/entities/user-project.entity';
import { UserProjectsService } from 'src/user-projects/user-projects.service';
import { UsersProjectsModule } from 'src/user-projects/users-projects.module';
import { ProjectModule } from 'src/project/project.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [TasksController],
  providers: [TasksService, UserProjectsService],
  imports: [
    TypeOrmModule.forFeature([Task]),
    LessonsModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UsersProjectsModule,
    SubmitTaskModule,
    ProjectModule,
    AuthModule
  ],
  exports: [TypeOrmModule],
})
export class TasksModule {}
