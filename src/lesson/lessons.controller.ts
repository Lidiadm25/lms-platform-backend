import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
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
  @UseInterceptors(FilesInterceptor('files'))
  create(
    @Body() createOneLessonDto: CreateOneLessonDto,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    return this.lessonsService.create(createOneLessonDto, files);
  }

  @Get('unit-id/:id')
  findAll(@Param('id') id: string) {
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
  @UseInterceptors(FilesInterceptor('files'))
  update(
    @Param('id') id: string,
    @Body() updateLessonDto: UpdateLessonDto,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    return this.lessonsService.update(id, updateLessonDto, files);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  remove(@Param('id') id: string) {
    return this.lessonsService.remove(id);
  }
}
