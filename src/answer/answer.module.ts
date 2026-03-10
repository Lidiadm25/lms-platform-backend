import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { Answer } from './entities/answer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [AnswerController],
  providers: [AnswerService],
  imports:[
    TypeOrmModule.forFeature([ Answer ]),
  ]
})
export class AnswerModule {}
