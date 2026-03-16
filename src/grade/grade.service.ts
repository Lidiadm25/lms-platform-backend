import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { User } from 'src/auth/entities/user.entity';
import { Not, Repository } from 'typeorm';
import { Grade } from './entities/grade.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SubmitTask } from 'src/submit-task/entities/submit-task.entity';
import { read } from 'fs';

@Injectable()
export class GradeService {

  constructor(
    @InjectRepository(Grade)
    private readonly gradeRepository:Repository<Grade>,
    @InjectRepository(SubmitTask)
    private readonly submitRepository:Repository<SubmitTask>

  ){}

  /**
   * POST method for grades
   * 
   * Can only be used by Admins who are the authors of the task to grade.
   * 
   * 
   * @param createGradeDto 
   * @param user 
   * @returns 
   */ 
  async create(createGradeDto: CreateGradeDto, user:User) {
    let task : SubmitTask | null;
    // Search for the task submitted
    let id:string = createGradeDto.taskSubmitId;
    
    task = await this.submitRepository.findOne({
      where: {id},
      relations: ['student', 'task.lesson_task.unit.project', 'task.user_author']
    })
    
    if (!task){
      throw new NotFoundException(`The submitted task was not found`)
    }

    if(user.id != task.task.user_author.id) {
      throw new UnauthorizedException(`Only the author of the task can put the grades`)
    }
    
    const grade = this.gradeRepository.create({
      ...createGradeDto,
      teacher: user,
      student : task?.student,
      taskSubmitted: {id: createGradeDto.taskSubmitId},
      project: task?.task.lesson_task.unit.project
    })
    await this.gradeRepository.save(grade)
    return {grade};
  }

  
  async findAllProject(idProject: string, user:User) {
    const grades= await this.gradeRepository.find({
      relations : {
        project: true,
        student: true
      },
      where: {
        project: {
          id: idProject
        },
        student: {
          id: user.id
        }
      }
    })

    if(!grades || grades.length == 0) {
      throw new NotFoundException(`Couldn't find any grades`)
    }

    return {grades};
  }

  findOne(id: string) {

    return `This action returns a #${id} grade`;
  }

  async update(id: string, updateGradeDto: UpdateGradeDto) {
    
    

    const submit = await this.submitRepository.findOneBy({id: updateGradeDto.taskSubmitId})

    if(updateGradeDto.taskSubmitId && updateGradeDto.taskSubmitId!==submit!.id){
      throw new BadRequestException(`Submission ID not valid`)
    }

    if(!submit){

      throw new NotFoundException(`The submitted task was not found`)

    }

    const grade = await this.gradeRepository.findOne({
      where: {id}
    });

    if(!grade){
      throw new NotFoundException(`The grade was not found`)
    }

    const updated = await this.gradeRepository.merge(grade, updateGradeDto);


    return await this.gradeRepository.save(updated);
  }

  async remove(id: string) {
    const grade = await this.gradeRepository.findOneBy({
      id: id
    })

    if(!grade){
      throw new NotFoundException(`The grade was not found`)
    }

    await this.gradeRepository.remove(grade);
  }
}
