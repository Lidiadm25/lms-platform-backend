import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm';
import { Survey } from 'src/survey/entities/survey.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(Survey)
    private readonly surveyRepository: Repository<Survey>,
  ) {}
  async create(createQuestionDto: CreateQuestionDto) {
    const survey = this.surveyRepository.findOneBy({
      id: createQuestionDto.surveyId,
    });
    if (!survey) throw new NotFoundException(`Survey not found`);

    return await this.questionRepository.save(createQuestionDto);
  }

  async findAll(id: string) {
    const questions = await this.questionRepository.find({
      where: {
        survey: {
          id: id,
        },
      },
    });
    return questions;
  }

  async getAvg(id: string) {
    const results = await this.questionRepository
      .createQueryBuilder('questions')
      .leftJoin('questions.answers', 'answers')
      .innerJoin('questions.survey', 'survey')
      .select('questions.title', 'question')
      .addSelect('ROUND(COALESCE(AVG(answers.rating),0),1) as avg')
      .where('survey.projectsId = :surveyId', { surveyId: id })
      .groupBy('questions.id')
      .getRawMany();

    return results;
  }

}
