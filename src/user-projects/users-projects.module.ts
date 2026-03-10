import { Module } from '@nestjs/common';
import { UsersProjectsService } from './users-projects.service';
import { UsersProjectsController } from './users-projects.controller';

@Module({
  controllers: [UsersProjectsController],
  providers: [UsersProjectsService],
})
export class UsersProjectsModule {}
