import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';


@Injectable()
export class ProjectService {

   private readonly logger = new Logger('ProjectService');


  constructor (
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>

  ) {}

  async create(createProjectDto: CreateProjectDto, user:User) {
    try {
       const project = this.projectRepository.create({
        ...createProjectDto, author: user
      }) 

      await this.projectRepository.save(project);
      console.log({project})
      return {project};
       
    } catch (error) {
      
      this.handleDBExceptions(error);
    }
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


   private handleDBExceptions( error: any ) {

    if ( error.code === '23505' )
      throw new BadRequestException(error.detail);
    
    this.logger.error(error)
    // console.log(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');

  }
}
