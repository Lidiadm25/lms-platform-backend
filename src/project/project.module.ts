import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService],
  imports:[
    TypeOrmModule.forFeature([ Project ]),
    AuthModule,
  ],
  exports: [ TypeOrmModule, ProjectService]
})
export class ProjectModule {}
