import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Survey } from 'src/survey/entities/survey.entity';
import { Repository } from 'typeorm';
import { CreateSurveyUserDto } from './dto/create-survey-user.dto';
import { UpdateSurveyUserDto } from './dto/update-survey-user.dto';
import { SurveyUser } from './entities/survey-user.entity';
import { userInfo } from 'os';

@Injectable()
export class SurveyUserService {
  constructor(
    @InjectRepository(SurveyUser)
    private readonly surveyUserRepository: Repository<SurveyUser>,
    @InjectRepository(Survey)
    private readonly surveyRepository: Repository<Survey>,
  ) {}

  async create(createSurveyUserDto: CreateSurveyUserDto, user: User) {
    const survey = await this.surveyRepository.findOneBy({
      id: createSurveyUserDto.surveyId,
    });

    if (!survey) throw new NotFoundException(`Survey not found`);
    var total: number = 0;
    createSurveyUserDto.answers.map((answer) => (total += answer.rating));

    total = total / createSurveyUserDto.answers.length;
    const userAnswer = this.surveyUserRepository.create({
      user: user,
      survey: survey,
      total: total,
      answers: createSurveyUserDto.answers.map((answer) => ({
        rating: answer.rating,
        questions: {
          id: answer.questionsId,
        },
      })),
    });

    return this.surveyUserRepository.save(userAnswer);
  }

  async getAvg(author: User) {
    const results = await this.surveyUserRepository
      .createQueryBuilder('ratings')
      .leftJoin('ratings.survey', 'survey')
      .leftJoin('survey.user_author', 'user_author')
      .leftJoin('survey.projects', 'projects')
      .where('user_author.id = :id', { id: author.id })
      .select('AVG(ratings.total) as avg')
      .addSelect('projects.id as id')
      .addSelect('projects.title as course')
      .distinct(true)
      .groupBy('course, id')
      .getRawMany();

    return results;
  }

  async getAvgSpecific(id: string) {
    const results = await this.surveyUserRepository
      .createQueryBuilder('ratings')
      .leftJoin('ratings.survey', 'survey')
      .leftJoin('survey.projects', 'projects')
      .where('projects.id = :id ', { id: id })
      .select('AVG(ratings.total) as avg')
      .getRawOne();

    if (results.avg == null) {
      return 0;
    }

    return results.avg;
  }

  findAll() {
    return `This action returns all surveyUser`;
  }

  async findOne(id: string, user: User) {
    const surveyUser = await this.surveyUserRepository.findOneBy({
      user: user,
      survey: { id: id },
    });
    if (!surveyUser)
      throw new NotFoundException(`User didn't answer the survey`);

    return surveyUser;
  }

  update(id: number, updateSurveyUserDto: UpdateSurveyUserDto) {
    return `This action updates a #${id} surveyUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} surveyUser`;
  }
}
