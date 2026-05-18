import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import { Section } from 'src/section/entities/section.entity';
import { Repository } from 'typeorm';
import { CreateOneLessonDto } from './dto/create-one-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Lesson } from './entities/lesson.entity';
import { StorageService } from 'src/files/storage/storage.service';
import { Files } from 'src/files/entities/file.entity';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
    @InjectRepository(Section)
    private readonly sectionRepository: Repository<Section>,
    private readonly storageService: StorageService,
    @InjectRepository(Files)
    private readonly filesRepository: Repository<Files>,
  ) {}

  async create(
    createOneLessonDto: CreateOneLessonDto,
    files?: Express.Multer.File[],
  ) {
    // Búsqueda por sección
    const section = await this.sectionRepository.findOneBy({
      id: createOneLessonDto.unit,
    });
    if (!section) {
      throw new NotFoundException(
        `Section of the lesson not found, id ${createOneLessonDto.unit}`,
      );
    }

    const lesson = this.lessonRepository.create({
      ...createOneLessonDto,
      unit: section,
    });
    const saved = await this.lessonRepository.save(lesson);

    if (files && files.length > 0) {
      const uploadFiles = await this.storageService.uploadMultipleFiles(files);
      const ids = uploadFiles.map((file) => file.id);
      await this.filesRepository.update(ids, { lesson: saved });
    }

    return this.findOne(saved.id);
  }


  async findOne(id: string) {
    let lesson!: Lesson | null;

    if (isUUID(id)) {
      lesson = await this.lessonRepository.findOne({
        where: { id: id },
        relations: { tasks: true, url_file: true },
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

  async update(
    id: string,
    updateLessonDto: UpdateLessonDto,
    files?: Express.Multer.File[],
  ) {
    if (updateLessonDto.id && updateLessonDto.id !== id) {
      throw new BadRequestException(`Lesson ID is not valid`);
    }

    const lesson = await this.lessonRepository.findOne({ where: { id } });

    if (!lesson) {
      throw new NotFoundException(`Lesson with id ${id} not found `);
    }

    const updated = this.lessonRepository.merge(lesson, updateLessonDto);
    const saved = await this.lessonRepository.save(updated);
    if (files && files.length > 0) {
      const uploadFiles = await this.storageService.uploadMultipleFiles(files);
      const ids = uploadFiles.map((file) => file.id);
      await this.filesRepository.update(ids, { lesson: saved });
    }

    return this.findOne(id);
  }

  async remove(id: string) {
    const lesson = await this.lessonRepository.findOne({ where: { id } });

    if (!lesson) {
      throw new NotFoundException(`Lesson with id ${id} not found `);
    }
    await this.lessonRepository.remove(lesson);
  }
}
