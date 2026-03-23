import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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
    console.log(updateSubmitTaskDto.url_file);

    const submit = await this.findOne(id);
    if (updateSubmitTaskDto.id && updateSubmitTaskDto.id !== id) {
      throw new BadRequestException(`Submit task id not valid`);
    }

    if (!submit) {
      throw new NotFoundException(`The submit was not found`);
    }

    const updated = await this.submitRepository.merge(
      submit,
      updateSubmitTaskDto,
    );

    return await this.submitRepository.save(updated);
  }

  async remove(id: string) {
    const submit = await this.findOne(id);

    await this.submitRepository.remove(submit);
  }
}
