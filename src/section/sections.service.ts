import { Project } from 'src/project/entities/project.entity';
import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { Not, Repository } from 'typeorm';
import { Section } from './entities/section.entity';
import { InjectRepository } from '@nestjs/typeorm';



@Injectable()
export class SectionsService {

  constructor(
    @InjectRepository(Section)
    private readonly sectionRepository:Repository<Section>,
    @InjectRepository(Project)
    private readonly projectRepository:Repository<Project>
  ){}

 async create(createSectionDto: CreateSectionDto) {
    const project = await this.projectRepository.findOneBy({id: createSectionDto.project})

    if(!project){
       throw new NotFoundException(`Project not found with id ${createSectionDto.project}`)
    }

    const newSection = this.sectionRepository.create({
      ...createSectionDto,
      project
    })    
    
    return await this.sectionRepository.save(newSection);
   
  }

  /* findAll() {
    return `This action returns all sections`;
  } */

 async findOne(id: string) {

  const section = await this.sectionRepository.findOneBy({id: id})

  if (!section) {
    throw new NotFoundException(`The section with id ${id} is not found`)
  }
    return {section};
  }

  async update(id: string, updateSectionDto: UpdateSectionDto) {

    if(updateSectionDto.id && updateSectionDto.id !== id) {
      throw new BadRequestException(`Section ID is not valid`)
    }

    const section = await this.sectionRepository.findOneBy({ id: id})
    
    if(!section){
      throw new NotFoundException(`Section with id ${id} not found`)
    }
    const {project, ...rest} = updateSectionDto;

    const updated = await this.sectionRepository.merge(section, rest);


   return await this.sectionRepository.save(updated);
  }

  async remove(id: string) {

    const section = await this.findOne (id);

    await this.sectionRepository.remove(section.section);
  }
}
