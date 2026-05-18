import { Module } from '@nestjs/common';
import { SurveyUserService } from './survey-user.service';
import { SurveyUserController } from './survey-user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyUser } from './entities/survey-user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { SurveyModule } from 'src/survey/survey.module';

@Module({
  controllers: [SurveyUserController],
  providers: [SurveyUserService],
  imports: [TypeOrmModule.forFeature([SurveyUser]), AuthModule, SurveyModule],
})
export class SurveyUserModule {}
