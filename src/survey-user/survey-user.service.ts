import { Injectable } from '@nestjs/common';
import { CreateSurveyUserDto } from './dto/create-survey-user.dto';
import { UpdateSurveyUserDto } from './dto/update-survey-user.dto';

@Injectable()
export class SurveyUserService {
  create(createSurveyUserDto: CreateSurveyUserDto) {
    return 'This action adds a new surveyUser';
  }

  findAll() {
    return `This action returns all surveyUser`;
  }

  findOne(id: number) {
    return `This action returns a #${id} surveyUser`;
  }

  update(id: number, updateSurveyUserDto: UpdateSurveyUserDto) {
    return `This action updates a #${id} surveyUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} surveyUser`;
  }
}
