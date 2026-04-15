import { Module } from '@nestjs/common';

import { UserProject } from './entities/user-project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProjectsController } from './user-projects.controller';
import { UserProjectsService } from './user-projects.service';
import { ProjectModule } from 'src/project/project.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [UserProjectsController],
  providers: [UserProjectsService],
  imports: [TypeOrmModule.forFeature([UserProject]), ProjectModule, AuthModule],
  exports:[UserProjectsService, TypeOrmModule]
})
export class UsersProjectsModule {}
