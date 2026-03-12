import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubmitTaskDto } from './dto/create-submit-task.dto';
import { UpdateSubmitTaskDto } from './dto/update-submit-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SubmitTask } from './entities/submit-task.entity';
import { Repository } from 'typeorm';
import { Task } from 'src/tasks/entities/task.entity';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class SubmitTaskService {


  constructor(
    @InjectRepository(SubmitTask)
    private readonly submitRepository:Repository<SubmitTask>,
    @InjectRepository(Task)
    private readonly taskRepository:Repository<Task>
  ){}

  async create(createSubmitTaskDto: CreateSubmitTaskDto, user: User) {

    // Busco la tarea (padre)
    const task = await this.taskRepository.findOneBy({id: createSubmitTaskDto.taskId})

    if(!task){
      throw new NotFoundException(`Task to submit not found with id ${createSubmitTaskDto.taskId}`)
    }

    const newSubmit = this.submitRepository.create({
      url_file: createSubmitTaskDto.file_url,
      task: task,
      student: user,
    })

    return await this.submitRepository.save(newSubmit);
  }

  findAll() {
    return `This action returns all submitTask`;
  }

  findOne(id: number) {
    return `This action returns a #${id} submitTask`;
  }

  update(id: number, updateSubmitTaskDto: UpdateSubmitTaskDto) {
    return `This action updates a #${id} submitTask`;
  }

  remove(id: number) {
    return `This action removes a #${id} submitTask`;
  }
}
