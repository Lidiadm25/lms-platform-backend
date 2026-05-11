import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SurveyUserService } from './survey-user.service';
import { CreateSurveyUserDto } from './dto/create-survey-user.dto';
import { UpdateSurveyUserDto } from './dto/update-survey-user.dto';
import { ValidRoles } from 'src/auth/interfaces/validRoles';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';

@Controller('survey-user')
export class SurveyUserController {
  constructor(private readonly surveyUserService: SurveyUserService) {}

  @Post()
  @Auth(ValidRoles.user)
  create(@Body() createSurveyUserDto: CreateSurveyUserDto, @GetUser() user: User) {

    return this.surveyUserService.create(createSurveyUserDto, user);
  }

  @Get()
  findAll() {
    return this.surveyUserService.findAll();
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id') id: string, @GetUser() user: User) {
    return this.surveyUserService.findOne(id, user);
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
