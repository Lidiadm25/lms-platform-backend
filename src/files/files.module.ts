import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { ConfigModule } from '@nestjs/config';
import { TasksModule } from 'src/tasks/tasks.module';
import { StorageService } from './storage/storage.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Files } from './entities/file.entity';

@Module({
  controllers: [FilesController],
  providers: [FilesService, StorageService],
  imports: [ConfigModule, TypeOrmModule.forFeature([Files])],
  exports: [TypeOrmModule, StorageService],
})
export class FilesModule {}
