import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SurveyUserService } from './survey-user.service';
import { CreateSurveyUserDto } from './dto/create-survey-user.dto';
import { UpdateSurveyUserDto } from './dto/update-survey-user.dto';

@Controller('survey-user')
export class SurveyUserController {
  constructor(private readonly surveyUserService: SurveyUserService) {}

  @Post()
  create(@Body() createSurveyUserDto: CreateSurveyUserDto) {
    return this.surveyUserService.create(createSurveyUserDto);
  }

  @Get()
  findAll() {
    return this.surveyUserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.surveyUserService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSurveyUserDto: UpdateSurveyUserDto) {
    return this.surveyUserService.update(+id, updateSurveyUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.surveyUserService.remove(+id);
  }
}
