import { Lesson } from './entities/lesson.entity';
import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isUUID } from 'class-validator';
import { CreateOneLessonDto } from './dto/create-one-lesson.dto';
import { Section } from 'src/sections/entities/section.entity';

@Injectable()
export class LessonsService {

  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository:Repository<Lesson>,
    @InjectRepository(Section)
    private readonly sectionRepository:Repository<Section>
  ){

  }

  async create(createOneLessonDto: CreateOneLessonDto) {

    // Búsqueda por sección 
    console.log("aqui")
    const section = await this.sectionRepository.findOneBy({id: createOneLessonDto.unit})
    if(!section){
      throw new NotFoundException(`Section of the lesson not found, id ${createOneLessonDto.unit}`)
    }

    // Create para que no se guarde como dto

    const newLesson = this.lessonRepository.create({
      title: createOneLessonDto.title,
      unit: section
    });
    console.log("aqui")

 

    return await this.lessonRepository.save(newLesson);
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
