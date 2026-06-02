import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ProjectModule } from 'src/project/project.module';
import { UserProject } from './entities/user-project.entity';
import { UserProjectsController } from './user-projects.controller';
import { UserProjectsService } from './user-projects.service';
import { FilesModule } from 'src/files/files.module';
import { StorageService } from 'src/files/storage/storage.service';

@Module({
  controllers: [UserProjectsController],
  providers: [UserProjectsService],
  imports: [TypeOrmModule.forFeature([UserProject]), ProjectModule, AuthModule, FilesModule],
  exports: [UserProjectsService, TypeOrmModule],
})
export class UsersProjectsModule {}
