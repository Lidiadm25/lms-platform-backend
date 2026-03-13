import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from 'src/auth/entities/user.entity';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from 'src/lesson/entities/lesson.entity';

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(Task)
    private readonly taskRepository:Repository<Task>,
    @InjectRepository(Lesson)
    private readonly lessonRepository:Repository<Lesson>
  ){}

  async create(createTaskDto: CreateTaskDto, user:User) {
    const lesson = await this.lessonRepository.findOneBy({
      id: createTaskDto.lesson
    })

    if(!lesson){
      throw new NotFoundException(`Lesson with id ${createTaskDto.lesson} not found`)
    }

    const newTask = this.taskRepository.create({
     ...createTaskDto,
     user_author: user,
     lesson_task: lesson

    })

    return await this.taskRepository.save(newTask);
  }

  findAll() {
    return `This action returns all tasks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {

    if(updateTaskDto.id && updateTaskDto.id !== id){
      throw new BadRequestException(`The task id is not valid`)
    }

    const task = await this.taskRepository.findOneBy({id: id})

    if(!task){
      throw new NotFoundException(`Task to update was not found`)
    }

    const updated = await this.taskRepository.merge(task, updateTaskDto);

    return await this.taskRepository.save(updated);
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
