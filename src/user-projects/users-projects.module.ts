import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ProjectModule } from 'src/project/project.module';
import { UserProject } from './entities/user-project.entity';
import { UserProjectsController } from './user-projects.controller';
import { UserProjectsService } from './user-projects.service';

@Module({
  controllers: [UserProjectsController],
  providers: [UserProjectsService],
  imports: [TypeOrmModule.forFeature([UserProject]), ProjectModule, AuthModule],
  exports: [UserProjectsService, TypeOrmModule],
})
export class UsersProjectsModule {}
