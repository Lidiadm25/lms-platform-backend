import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import { Section } from 'src/section/entities/section.entity';
import { Repository } from 'typeorm';
import { CreateOneLessonDto } from './dto/create-one-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Lesson } from './entities/lesson.entity';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
    @InjectRepository(Section)
    private readonly sectionRepository: Repository<Section>,
  ) {}

  async create(createOneLessonDto: CreateOneLessonDto) {
    // Búsqueda por sección
    const section = await this.sectionRepository.findOneBy({
      id: createOneLessonDto.unit,
    });
    if (!section) {
      throw new NotFoundException(
        `Section of the lesson not found, id ${createOneLessonDto.unit}`,
      );
    }

    // Create para que no se guarde como dto

    const lesson = this.lessonRepository.create({
      ...createOneLessonDto,
      unit: section,
    });

    return await this.lessonRepository.save(lesson);
  }

  /*findAll() {
    return `This action returns all lessons`;
  } */

  async findOne(id: string) {
    let lesson!: Lesson | null;

    if (isUUID(id)) {
      lesson = await this.lessonRepository.findOne({
        where: { id: id },
        relations: { tasks: true },
      });
    }

    if (!lesson) {
      throw new NotFoundException(`Lesson with id ${id} not found`);
    }
    return lesson;
  }

  async getTree(id: string) {
    const lesson = await this.lessonRepository
      .createQueryBuilder('lesson')
      .leftJoinAndSelect('lesson.unit', 'section')
      .leftJoinAndSelect('section.project', 'project')
      .where('lesson.id = :id', { id: id })
      .getRawOne();

    return lesson;
  }

  async findAllByUnit(id: string) {
    const lessons = await this.lessonRepository.find({
      where: { unit: { id: id } },
    });

    return lessons;
  }

  async update(id: string, updateLessonDto: UpdateLessonDto) {
    if (updateLessonDto.id && updateLessonDto.id !== id) {
      throw new BadRequestException(`Lesson ID is not valid`);
    }

    const lesson = await this.lessonRepository.findOne({ where: { id } });

    if (!lesson) {
      throw new NotFoundException(`Lesson with id ${id} not found `);
    }

    const updated = await this.lessonRepository.merge(lesson, updateLessonDto);

    return await this.lessonRepository.save(updated);
  }

  async remove(id: string) {
    const lesson = await this.lessonRepository.findOne({ where: { id } });

    if (!lesson) {
      throw new NotFoundException(`Lesson with id ${id} not found `);
    }

    await this.lessonRepository.remove(lesson);
  }
}
