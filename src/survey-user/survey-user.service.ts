import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSurveyUserDto } from './dto/create-survey-user.dto';
import { UpdateSurveyUserDto } from './dto/update-survey-user.dto';
import { User } from 'src/auth/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SurveyUser } from './entities/survey-user.entity';
import { Not, Repository } from 'typeorm';
import { Survey } from 'src/survey/entities/survey.entity';

@Injectable()
export class SurveyUserService {

  constructor(
    @InjectRepository(SurveyUser)
    private readonly surveyUserRepository :Repository<SurveyUser>,
    @InjectRepository(Survey)
    private readonly surveyRepository : Repository<Survey>
  ){}

  async create(createSurveyUserDto: CreateSurveyUserDto, user:User) {

    const survey = await this.surveyRepository.findOneBy({id: createSurveyUserDto.idSurvey})
    
    if(!survey) throw new NotFoundException(`Survey not found`)

  const answer =  this.surveyUserRepository.create({
      ...createSurveyUserDto,
      survey: survey
    })
    return this.surveyUserRepository.save(answer);
  }

  findAll() {
    return `This action returns all surveyUser`;
  }

  async findOne(id: string, user:User) {
    const surveyUser = await this.surveyUserRepository.findOneBy({user: user, survey: {id: id}})
    if(!surveyUser) throw new NotFoundException(`User didn't answer the survey`)

      return surveyUser;
  }

  update(id: number, updateSurveyUserDto: UpdateSurveyUserDto) {
    return `This action updates a #${id} surveyUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} surveyUser`;
  }
}
