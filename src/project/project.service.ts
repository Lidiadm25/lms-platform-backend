import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { isUUID } from 'class-validator';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ValidRoles } from 'src/auth/interfaces/validRoles';

@Injectable()
export class ProjectService {
  private readonly logger = new Logger('ProjectService');

  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}
  // TODO. change user data / select
  async create(createProjectDto: CreateProjectDto, user: User) {
    try {
      const project = this.projectRepository.create({
        ...createProjectDto,
        author: user,
      });
      await this.projectRepository.save(project);
      return { project };
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  // Returns all projects
  async findAll(paginationDto: PaginationDto, user: User) {
    // default values for pagination
    const { limit = 10, offset = 0 } = paginationDto;
    let projects: Project[] | undefined;
    let totalProjects: number = 0;

    // All projects
    if (user.roles.includes(ValidRoles.user)) {
      projects = await this.projectRepository.find({
        take: limit,
        skip: offset,
        relations: {
          units: true,
          students: true,
        },
      });

      totalProjects = await this.projectRepository.count({});
    } else {
      // Projects only admin created
      projects = await this.projectRepository.find({
        take: limit,
        skip: offset,
        relations: {
          units: true,
          students: true,
          author: true,
        },
        where: {
          author: {
            id: user.id,
          },
        },
      });
      totalProjects = await this.projectRepository.count({});
    }
     console.log({projects})
    if (projects) {
     
      const projectsWithStudents = projects.map((project) => ({
        ...project,
        studentsCount: project.students.length,
      }));

      return {
        count: totalProjects,
        pages: Math.ceil(totalProjects / limit),
        projectsWithStudents
      };
    }
  }

  // Returns a project by uuid and its sections/lessons
  async findOne(id: string) {
    let project: Project | null;

    if (isUUID(id)) {
      project = await this.projectRepository.findOne({
        where: { id },
        relations: ['units', 'units.lessons'],
      });
    } else {
      project = null;
    }

    if (!project) {
      throw new NotFoundException(`Project with id: ${id} not found`);
    }

    return project;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    if (updateProjectDto.id && updateProjectDto.id !== id) {
      throw new BadRequestException(`Project ID is not valid`);
    }

    const project = await this.projectRepository.findOneBy({ id: id });

    if (!project) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }

    const updated = await this.projectRepository.merge(
      project,
      updateProjectDto,
    );

    return await this.projectRepository.save(updated);
  }

  async remove(id: string) {
    const project = await this.findOne(id);
    await this.projectRepository.remove(project);
    return `Removed successfully`;
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    // console.log(error)
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
