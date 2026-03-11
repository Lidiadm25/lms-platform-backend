import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { User } from 'src/auth/entities/user.entity';
import { Not, Repository } from 'typeorm';
import { Section } from './entities/section.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SectionsService {

  constructor(
    @InjectRepository(Section)
    private readonly sectionRepository:Repository<Section>
  ){}

 async create(createSectionDto: CreateSectionDto) {
     try {
       const section = this.sectionRepository.create({
        ...createSectionDto
      }) 
      await this.sectionRepository.save(section);
      return {section};
       
    } catch (error) {
      
    }

   
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

    const updated = await this.sectionRepository.merge(section, updateSectionDto);


    return await this.sectionRepository.save(updated);
  }

  async remove(id: string) {

    const section = await this.findOne (id);

    await this.sectionRepository.remove(section.section);
  }
}
