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

@Injectable()
export class ProjectService {
  private readonly logger = new Logger('ProjectService');

  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    private storageService: StorageService,
  ) {}
  async create(
    createProjectDto: CreateProjectDto,
    user: User,
    image?: Express.Multer.File,
  ) {
    var imageFile;
    if (image) {
      const upload = await this.storageService.uploadImage(image);
      imageFile = { id: upload.id };
    }

    try {
      const project = this.projectRepository.create({
        ...createProjectDto,
        author: user,
        image: imageFile,
      });
      const saved = await this.projectRepository.save(project);
      return this.findOne(saved.id);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findFiltered(paginationDto: PaginationDto, query: string) {
    if (!paginationDto.limit) {
      paginationDto.limit = 9;
    }

    // if (query.trim().length > 0) {
    //   query = '%' + query.trim() + '%';
    // }

    let querySQL = await this.projectRepository
      .createQueryBuilder('projects')
      .take(paginationDto.limit)
      .skip(paginationDto.offset)
      .leftJoinAndSelect('projects.category', 'category')
      .leftJoinAndSelect('projects.image', 'image')
      .where('1=1');

    // Check it has category
    if (
      paginationDto.category !== undefined &&
      paginationDto.category.length != 0
    ) {
      querySQL.andWhere('category.id = :id', {
        id: paginationDto.category,
      });
    }

    if (query.trim().length) {
      querySQL.andWhere('title like :query', { query: `%${query}%` });
    }

    const [results, count] = await querySQL.getManyAndCount();

    if (!results) {
      throw new NotFoundException(`No project found`);
    }

    const projects = await Promise.all(
      results.map(async (project) => {
        var imageUrl: string | undefined = undefined;
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
      count: count,
      pages: Math.ceil(count / paginationDto.limit),
      projects,
    };
  }

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
        .leftJoinAndSelect('projects.image', 'files')
        .take(paginationDto.limit)
        .skip(paginationDto.offset)
        .orderBy('projects.title', 'DESC')
        .where('projects.isActive=true');

      // Check it has category
      if (
        paginationDto.category !== undefined &&
        paginationDto.category.length != 0
      ) {
        query.andWhere('category.name = :name', {
          name: paginationDto.category,
        });
      }
      const [results, count] = await query.getManyAndCount();
      projectsQuery = results;
      totalProjects = count;
    } else {
      // Projects only admin created
      const [results, count] = await this.projectRepository.findAndCount({
        take: paginationDto.limit,
        skip: paginationDto.offset,
        relations: {
          units: true,
          students: true,
          author: true,
          image: true,
        },
        order: {
          title: 'DESC',
        },
        where: {
          author: {
            id: user.id,
          },
        },
      });

      projectsQuery = results;
      totalProjects = count;
    }

    const projects = await Promise.all(
      projectsQuery.map(async (project) => {
        var imageUrl: string | undefined = undefined;
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
      count: totalProjects,
      pages: Math.ceil(totalProjects / paginationDto.limit),
      projects,
    };
  }

  // Returns a project by uuid and its sections/lessons
  async findOne(id: string) {
    let project: Project | null;

    if (isUUID(id)) {
      project = await this.projectRepository.findOne({
        where: { id },
        relations: ['units', 'units.lessons', 'author', 'category', 'image'],
      });
    } else {
      project = null;
    }

    if (!project) {
      throw new NotFoundException(`Project with id: ${id} not found`);
    }

    if (project.image) {
      project.image.url = await this.storageService.getFileUrl(
        project.image.key,
      );
    }

    return project;
  }

  async update(
    id: string,
    updateProjectDto: UpdateProjectDto,
    image?: Express.Multer.File,
  ) {
    const project = await this.projectRepository.findOne({
      where: { id: id },
      relations: {
        image: true,
      },
    });

    if (!project) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }

    if (image) {
      const upload = await this.storageService.uploadImage(image);
      project.image = { id: upload.id } as any;
    }

    const updated = await this.projectRepository.merge(
      project,
      updateProjectDto,
    );

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
    // console.log(error)
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
