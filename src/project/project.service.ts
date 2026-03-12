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
  async findAll() {
    return await this.projectRepository.find();
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

    if(updateProjectDto.id && updateProjectDto.id!== id) {
      throw new BadRequestException(`Project ID is not valid`)
    }

    const project = await this.projectRepository.findOneBy({id: id});

    if(!project){
      throw new NotFoundException(`Project with id ${id} not found`)
    }

    const updated = await this.projectRepository.merge(project,updateProjectDto)

    return await this.projectRepository.save(updated);
  }

  remove(id: string) {
    return `This action removes a #${id} project`;
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
