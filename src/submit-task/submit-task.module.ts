import { forwardRef, Module } from '@nestjs/common';
import { SubmitTaskService } from './submit-task.service';
import { SubmitTaskController } from './submit-task.controller';
import { SubmitTask } from './entities/submit-task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/tasks/entities/task.entity';
import { TasksModule } from 'src/tasks/tasks.module';
import { PassportModule } from '@nestjs/passport';

import { ConfigModule } from '@nestjs/config';
import { FilesModule } from 'src/files/files.module';

@Module({
  controllers: [SubmitTaskController],
  providers: [SubmitTaskService],
  imports: [
    TypeOrmModule.forFeature([SubmitTask]),
    forwardRef(() => TasksModule),
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    FilesModule,
  ],
  exports: [TypeOrmModule],
})
export class SubmitTaskModule {}
