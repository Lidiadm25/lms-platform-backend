import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.create(createQuestionDto);
  }

  @Get('/survey/:id')
  findAll(@Param('id') id: string) {
    return this.questionService.findAll(id);
  }

  @Get(':idProject/avg')
  getAvgPerQuesiton(@Param('idProject') id: string) {
    return this.questionService.getAvg(id);
  }
}
