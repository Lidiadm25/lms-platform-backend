import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces/validRoles';
import { CreateOneLessonDto } from './dto/create-one-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { LessonsService } from './lessons.service';

@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Post()
  @Auth(ValidRoles.admin)
  create(@Body() createOneLessonDto: CreateOneLessonDto) {
    return this.lessonsService.create(createOneLessonDto);
  }

  @Get('unit-id/:id')
  findAll(@Param('id') id:string) {
    return this.lessonsService.findAllByUnit(id);
  } 

    @Get('tree/:id')
  findTree(@Param('id') id: string) {
    return this.lessonsService.getTree(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessonsService.findOne(id);
  }



  @Patch(':id')
  @Auth(ValidRoles.admin)
  update(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto) {
    return this.lessonsService.update(id, updateLessonDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  remove(@Param('id') id: string) {
    return this.lessonsService.remove(id);
  }
}
