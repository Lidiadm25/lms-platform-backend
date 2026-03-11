import { Module } from '@nestjs/common';
import { SectionsService } from './sections.service';
import { SectionsController } from './sections.controller';
import { Section } from './entities/section.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [SectionsController],
  providers: [SectionsService],
  imports: [
    TypeOrmModule.forFeature([ Section ]),
  ],
  exports:[SectionsService]
})
export class SectionsModule {}
