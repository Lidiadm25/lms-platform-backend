import { Module } from '@nestjs/common';
import { SectionsService } from './sections.service';
import { SectionsController } from './sections.controller';
import { Section } from './entities/section.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [SectionsController],
  providers: [SectionsService],
  imports: [
    TypeOrmModule.forFeature([ Section ]),
     AuthModule,
  ],
  exports:[TypeOrmModule,SectionsService]
})
export class SectionsModule {}
