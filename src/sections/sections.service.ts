import { Injectable } from '@nestjs/common';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
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

  findAll() {
    return `This action returns all sections`;
  }

  findOne(id: number) {
    return `This action returns a #${id} section`;
  }

  update(id: number, updateSectionDto: UpdateSectionDto) {
    return `This action updates a #${id} section`;
  }

  remove(id: number) {
    return `This action removes a #${id} section`;
  }
}
