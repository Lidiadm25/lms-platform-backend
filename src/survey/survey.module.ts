import { Module } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { SurveyController } from './survey.controller';
import { Survey } from './entities/survey.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [SurveyController],
  providers: [SurveyService],
  imports:[
    TypeOrmModule.forFeature([ Survey ]),
  ]
})
export class SurveyModule {}
