import { Module } from '@nestjs/common';
import { UsersProjectsService } from './users-projects.service';
import { UsersProjectsController } from './users-projects.controller';
import { UserProject } from './entities/user-project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [UsersProjectsController],
  providers: [UsersProjectsService],
  imports:[
    TypeOrmModule.forFeature([ UserProject ]),
  ]
})
export class UsersProjectsModule {}
