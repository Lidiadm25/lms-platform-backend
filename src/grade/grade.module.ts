import { Module } from '@nestjs/common';
import { GradeService } from './grade.service';
import { GradeController } from './grade.controller';
import { Grade } from './entities/grade.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { SubmitTask } from 'src/submit-task/entities/submit-task.entity';

@Module({
  controllers: [GradeController],
  providers: [GradeService],
  imports: [
    TypeOrmModule.forFeature([Grade, SubmitTask]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  exports: [TypeOrmModule],
})
export class GradeModule {}
