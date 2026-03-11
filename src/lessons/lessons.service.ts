import { Lesson } from './entities/lesson.entity';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isUUID } from 'class-validator';

@Injectable()
export class LessonsService {

  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository:Repository<Lesson>
  ){

  }

  create(createLessonDto: CreateLessonDto) {
    this.lessonRepository.save(createLessonDto);

    return {createLessonDto};
  }

  /*findAll() {
    return `This action returns all lessons`;
  } */

  async findOne(id: string) {

    let lesson !:Lesson | null;

    if(isUUID(id)){
      lesson = await this.lessonRepository.findOneBy({id: id})
    }

   
    if(!lesson){
      throw new NotFoundException(`Lesson with id ${id} not found`)
    }

    return {lesson} ;
  }

  async update(id: string, updateLessonDto: UpdateLessonDto) {
   

    if(updateLessonDto.id && updateLessonDto.id !== id) {
      throw new BadRequestException(`Lesson ID is not valid`)
    }

    const lesson = await this.lessonRepository.findOne({where: {id}});

    if(!lesson){
    throw new NotFoundException(`Lesson with id ${id} not found `)
   }

    const updated = await  this.lessonRepository.merge(lesson, updateLessonDto);
    
   

   return await this.lessonRepository.save(updated);

    
    
  }

  async remove(id: string) {
     const lesson = await this.lessonRepository.findOne({where: {id}});
    
     if(!lesson){
    throw new NotFoundException(`Lesson with id ${id} not found `)
   }

    await this.lessonRepository.remove(lesson)
    return `Removed correctly`;
  }
}
