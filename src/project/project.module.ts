import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { AuthModule } from 'src/auth/auth.module';
import { FilesModule } from 'src/files/files.module';
import { ProjectRepository } from './project.repository';


@Module({
  controllers: [ProjectController],
  providers: [ProjectService, ProjectRepository],
  imports: [TypeOrmModule.forFeature([Project]), AuthModule, FilesModule],
  exports: [TypeOrmModule, ProjectService, ProjectRepository],
})
export class ProjectModule {}
