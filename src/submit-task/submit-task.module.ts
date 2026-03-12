import { Module } from '@nestjs/common';
import { SubmitTaskService } from './submit-task.service';
import { SubmitTaskController } from './submit-task.controller';

@Module({
  controllers: [SubmitTaskController],
  providers: [SubmitTaskService],
})
export class SubmitTaskModule {}
