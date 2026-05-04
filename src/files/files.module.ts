import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { ConfigModule } from '@nestjs/config';
import { TasksModule } from 'src/tasks/tasks.module';
import { StorageService } from './storage/storage.service';


@Module({
  controllers: [FilesController],
  providers: [FilesService, StorageService],
  imports:[
    ConfigModule, TasksModule
  ]
})
export class FilesModule {}
