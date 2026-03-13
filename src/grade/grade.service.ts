import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
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

  async create(createGradeDto: CreateGradeDto, user:User) {
    let task : SubmitTask | null;
    // Search for the task submitted
    let id:string = createGradeDto.taskSubmitId;
    task = await this.submitRepository.findOne({
      where: {id},
      relations: ['student', 'task.lesson_task.unit.project']
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

  findAll() {
    return `This action returns all grade`;
  }

  findOne(id: number) {
    return `This action returns a #${id} grade`;
  }

  update(id: number, updateGradeDto: UpdateGradeDto) {
    return `This action updates a #${id} grade`;
  }

  remove(id: number) {
    return `This action removes a #${id} grade`;
  }
}
