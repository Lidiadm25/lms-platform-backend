import { Injectable } from '@nestjs/common';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { User } from 'src/auth/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Survey } from './entities/survey.entity';
import { Repository } from 'typeorm';
import { Project } from 'src/project/entities/project.entity';
import { NotFoundError } from 'rxjs';
import { Question } from 'src/question/entities/question.entity';

@Injectable()
export class SurveyService {

  constructor(
    @InjectRepository(Survey)
    private readonly surveyRepository: Repository<Survey>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>
  ){}

  async create(createSurveyDto: CreateSurveyDto, user: User) {
    console.log(createSurveyDto)
    const project = await this.projectRepository.findOne({where : {id: createSurveyDto.idProject}})

    if(!project) throw new NotFoundError(`Project with id ${createSurveyDto.idProject} doens't exists`)

    const survey = this.surveyRepository.create({
      questions: createSurveyDto.questions,
      user_author: user,
      projects: project
    })  

    await this.surveyRepository.save(survey)

    console.log("guarda survey")

    return this.surveyRepository.findOne({
      where: {id: survey.id},
      relations: {
        questions:true
      }
    })
   

  }

  findAll() {
    return `This action returns all survey`;
  }

  findOne(id: number) {
    return `This action returns a #${id} survey`;
  }

  update(id: number, updateSurveyDto: UpdateSurveyDto) {
    return `This action updates a #${id} survey`;
  }

  remove(id: number) {
    return `This action removes a #${id} survey`;
  }


  async surveyProjectsAuthor(user: User){
    const query = this.surveyRepository.createQueryBuilder('survey')
    .where("survey.author = :user",{user: user})
    .select("avg");
  }
}
