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

  async findFiltered(paginationDto: PaginationDto, query: string) {
    query = '%' + query + '%';
    const projects = await this.projectRepository
      .createQueryBuilder('projects')
      .where('title like :query', { query })
      .getMany();

    if (!projects) {
      throw new NotFoundException(`No project found`);
    }

    if (paginationDto.limit == undefined) {
      paginationDto.limit = 9;
    }
    const totalProjects = projects.length;
    return {
      count: totalProjects,
      pages: Math.ceil(totalProjects / paginationDto.limit),
      projects,
    };
  }

  // Returns all projects
  // TODO divide in two services -> do the difference from controller
  async findAll(paginationDto: PaginationDto, user: User) {
    let projectsQuery: Project[] | undefined;
    let totalProjects: number = 0;
    if (!paginationDto.limit) {
        paginationDto.limit = 9;
      }
    // All projects
    if (user.roles.includes(ValidRoles.user)) {
      let query = this.projectRepository
        .createQueryBuilder('projects')
        .leftJoinAndSelect('projects.units', 'units')
        .leftJoinAndSelect('projects.students', 'students')
        .leftJoinAndSelect('projects.author', 'author')
        .leftJoinAndSelect('projects.category', 'category')
        .take(paginationDto.limit)
        .skip(paginationDto.offset)
        .orderBy("projects.title", "DESC")
        .where('1=1');

        // Check it has category
      if (
        paginationDto.category !== undefined &&
        paginationDto.category.length != 0
      ) {
        query.andWhere('category.name = :name', {
          name: paginationDto.category,
        });
      }

      try {
        projectsQuery = await query.getMany();
        console.log({projectsQuery})
      } catch (error) {
        throw error;
      }
      totalProjects =  await query.getCount(); 
      console.log(totalProjects)
      
    } else {
      // Projects only admin created
      [projectsQuery, totalProjects] = await this.projectRepository.findAndCount({
        take: paginationDto.limit,
        skip: paginationDto.offset,
        relations: {
          units: true,
          students: true,
          author: true,
        },
        order: {
          title: 'DESC'
        },
        where: {
          author: {
            id: user.id,
          },
        },
      });
      
    }

    if (projectsQuery) {
      const projects = projectsQuery.map((project) => ({
        ...project,
        studentsCount: project.students.length,
      }));
      
      console.log({
        count: totalProjects,
        pages: Math.ceil(totalProjects / paginationDto.limit),
        projects,
      })

      return {
        count: totalProjects,
        pages: Math.ceil(totalProjects / paginationDto.limit),
        projects,
      };
    }
  }

  // Returns a project by uuid and its sections/lessons
  async findOne(id: string) {
    let project: Project | null;

    if (isUUID(id)) {
      project = await this.projectRepository.findOne({
        where: { id },
        relations: ['units', 'units.lessons', 'author'],
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
