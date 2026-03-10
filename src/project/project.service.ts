import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { Section } from 'src/sections/entities/section.entity';
import { User } from 'src/auth/entities/user.entity';
import { DataSource } from 'typeorm/browser';

@Injectable()
export class ProjectService {

  constructor (
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,

    @InjectRepository(Section)
    private readonly sectionRepository:Repository<Section>,

    private readonly dataSource:DataSource

  ) {}

  async create(createProjectDto: CreateProjectDto, user:User) {
    try {
      const unitsId = createProjectDto.units.map((unit) => unit.id)
      const project = new Project();
     // project.units = units;


    } catch (error) {
      
    }
    return {createProjectDto, user}
  }

  findAll() {
    return `This action returns all project`;
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
