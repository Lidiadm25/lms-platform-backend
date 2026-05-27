import { url } from 'inspector';
import { StorageService } from './../files/storage/storage.service';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import { User } from 'src/auth/entities/user.entity';
import { ValidRoles } from 'src/auth/interfaces/validRoles';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { ProjectRepository } from './project.repository';

@Injectable()
export class ProjectService {
  private readonly logger = new Logger('ProjectService');

  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly storageService: StorageService,
  ) {}

  async create(createProjectDto: CreateProjectDto, user: User, image?: Express.Multer.File) {
    let imageFile;
    if (image) {
      const upload = await this.storageService.uploadImage(image);
      imageFile = { id: upload.id };
    }

    try {
      const saved = await this.projectRepository.createProject(createProjectDto, user, imageFile);
      return this.findOne(saved.id);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findFiltered(paginationDto: PaginationDto, query: string) {
    const limit = paginationDto.limit || 9;
    const [results, count] = await this.projectRepository.findFilteredProjects(paginationDto, query);

    if (!results) {
      throw new NotFoundException(`No project found`);
    }

    const projects = await Promise.all(
      results.map(async (project) => {
        let imageUrl: string | undefined = undefined;
        if (project.image) {
          imageUrl = await this.storageService.getFileUrl(project.image.key);
        }

        return {
          ...project,
          studentsCount: project.students ? project.students.length : 0,
          image: project.image ? { ...project.image, url: imageUrl } : null,
        };
      }),
    );

    return {
      count,
      pages: Math.ceil(count / limit),
      projects,
    };
  }

  async findAll(paginationDto: PaginationDto, user: User) {
    const limit = paginationDto.limit || 9;
    const offset = paginationDto.offset || 0;
    let results, count;

    if (user.roles.includes(ValidRoles.user)) {
      [results, count] = await this.projectRepository.findAllUserProjects(limit, offset, paginationDto.category);
    } else {
      [results, count] = await this.projectRepository.findAllAdminProjects(limit, offset, user.id);
    }

    const projects = await Promise.all(
      results.map(async (project) => {
        let imageUrl: string | undefined = undefined;
        if (project.image) {
          imageUrl = await this.storageService.getFileUrl(project.image.key);
        }

        return {
          ...project,
          studentsCount: project.students ? project.students.length : 0,
          image: project.image ? { ...project.image, url: imageUrl } : null,
        };
      }),
    );

    return {
      count,
      pages: Math.ceil(count / limit),
      projects,
    };
  }

  async findOne(id: string) {
    if (!isUUID(id)) {
      throw new NotFoundException(`Project with id: ${id} not found`);
    }

    const project = await this.projectRepository.findProjectById(id);

    if (!project) {
      throw new NotFoundException(`Project with id: ${id} not found`);
    }

    if (project.image) {
      project.image.url = await this.storageService.getFileUrl(project.image.key);
    }

    return project;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto, image?: Express.Multer.File) {
    const project = await this.projectRepository.findProjectById(id);

    if (!project) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }

    if (image) {
      const upload = await this.storageService.uploadImage(image);
      project.image = { id: upload.id } as any;
    }

    const updated = this.projectRepository.merge(project, updateProjectDto);
    const saved = await this.projectRepository.save(updated);

    return this.findOne(saved.id);
  }

  async remove(id: string) {
    const project = await this.findOne(id);
    await this.projectRepository.remove(project);
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error, check server logs');
  }
}