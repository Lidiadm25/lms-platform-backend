import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Project } from 'src/project/entities/project.entity';
import { Question } from 'src/question/entities/question.entity';
import { Repository } from 'typeorm';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { Survey } from './entities/survey.entity';

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(Survey)
    private readonly surveyRepository: Repository<Survey>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  async create(createSurveyDto: CreateSurveyDto, user: User) {
    try {
      const project = await this.projectRepository.findOne({
        where: { id: createSurveyDto.projectsId },
      });

      if (!project)
        throw new NotFoundException(
          `Project with id ${createSurveyDto.projectsId} doens't exists`,
        );

      const survey = this.surveyRepository.create({
        questions: createSurveyDto.questions,
        user_author: user,
        projects: project,
      });

      await this.surveyRepository.save(survey);
      return this.surveyRepository.findOne({
        where: { id: survey.id },
        relations: {
          questions: true,
        },
      });
    } catch (error: any) {
      if (error.errno == 1062) {
        throw new ConflictException(`Course already has a survey.`);
      } else {
        throw new InternalServerErrorException(`Please contact admin`);
      }
    }
  }

  findAll() {
    return `This action returns all survey`;
  }

  async findOne(id: string) {
    const survey = await this.surveyRepository.findOne({
      where: { projects: { id: id } },
      relations: { questions: true },
    });

    if (!survey)
      throw new NotFoundException(`No survey found for this project`);

    return survey;
  }

  update(id: number, updateSurveyDto: UpdateSurveyDto) {
    return `This action updates a #${id} survey`;
  }

  remove(id: number) {
    return `This action removes a #${id} survey`;
  }

  async surveyProjectsAuthor(user: User) {
    const query = this.surveyRepository
      .createQueryBuilder('survey')
      .where('survey.author = :user', { user: user })
      .select('avg');
  }
}
