import { Module } from '@nestjs/common';
import { SectionsService } from './sections.service';
import { SectionsController } from './sections.controller';
import { Section } from './entities/section.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ProjectModule } from 'src/project/project.module';

@Module({
  controllers: [SectionsController],
  providers: [SectionsService],
  imports: [
    TypeOrmModule.forFeature([ Section ]),
     AuthModule,
     ProjectModule
  ],
  exports:[TypeOrmModule]
})
export class SectionsModule {}
