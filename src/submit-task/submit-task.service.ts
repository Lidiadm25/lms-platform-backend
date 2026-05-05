import {
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Task } from 'src/tasks/entities/task.entity';
import { Repository } from 'typeorm';
import { CreateSubmitTaskDto } from './dto/create-submit-task.dto';
import { UpdateSubmitTaskDto } from './dto/update-submit-task.dto';
import { SubmitTask } from './entities/submit-task.entity';

@Injectable()
export class SubmitTaskService {
  constructor(
    @InjectRepository(SubmitTask)
    private readonly submitRepository: Repository<SubmitTask>,
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(createSubmitTaskDto: CreateSubmitTaskDto, user: User) {
    // Busco la tarea (padre)
    const task = await this.taskRepository.findOneBy({
      id: createSubmitTaskDto.taskId,
    });

    if (!task) {
      throw new NotFoundException(
        `Task to submit not found with id ${createSubmitTaskDto.taskId}`,
      );
    }

    if (task.getActive() == false) {
      throw new UnauthorizedException(`Task out of date`);
    }

    const newSubmit = this.submitRepository.create({
      url_file: createSubmitTaskDto.url_file,
      task: task,
      student: user,
    });

    return await this.submitRepository.save(newSubmit);
  }

  findAll() {
    return `This action returns all submitTask`;
  }

  async findOne(id: string) {
    const submit = await this.submitRepository.findOneBy({ id: id });

    if (!submit) {
      throw new NotFoundException(`The submit of the task was not found`);
    }

    return submit;
  }

  async update(id: string, updateSubmitTaskDto: UpdateSubmitTaskDto) {


    const submit = await this.findOne(id);

    if (!submit) {
      throw new NotFoundException(`The submit was not found`);
    }
    
    console.log(updateSubmitTaskDto.url_file)
   const result = await this.submitRepository.update(id, {
    url_file: updateSubmitTaskDto.url_file,
    date_send: new Date()
   })

    return await this.submitRepository.findOne({where : { id: id}});
  }

  async remove(id: string) {
    const submit = await this.findOne(id);

    await this.submitRepository.remove(submit);
  }

  async findByUser(id: string) {
    const result = await this.submitRepository.findAndCount({
      where: {
        student: {
          id: id,
        },
      },
      relations: { task: true },
    });

    

    return {
      tasks: result[0],
      count: result[1],
    };
  }

  async findByUserTask(userId: string, taskId: string) {
    const result = await this.submitRepository.findOne({
      where: {
        student: {
          id: userId,
        },
        task: {
          id: taskId,
        },
      },
    });

    if (!result)
      throw new NotFoundException(`No task found from user with id ${userId}`);

    return result;
  }

  // todo sacar grades
  async findByTask(id: string, user: User) {
    

    const submit = await this.submitRepository
      .createQueryBuilder('submit')
      .where('submit.task = :id', { id: id })
      .andWhere('submit.student = :idUser', { idUser: user.id })
      .getOne();
   
    return submit;
  }
}
