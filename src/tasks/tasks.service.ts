import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Lesson } from 'src/lesson/entities/lesson.entity';
import { SubmitTask } from 'src/submit-task/entities/submit-task.entity';
import { Repository } from 'typeorm';
import { UserProjectsService } from './../user-projects/user-projects.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
    @InjectRepository(SubmitTask)
    private readonly submitRepository: Repository<SubmitTask>,
    private readonly userProjectsService: UserProjectsService,
  ) {}

  async create(createTaskDto: CreateTaskDto, user: User) {
    const lesson = await this.lessonRepository.findOneBy({
      id: createTaskDto.lesson,
    });

    if (!lesson) {
      throw new NotFoundException(
        `Lesson with id ${createTaskDto.lesson} not found`,
      );
    }

    const { users, ...rest } = await this.userProjectsService.getAllPerProject(
      createTaskDto.idProject,
      null,
    );

    const newTask = this.taskRepository.create({
      ...createTaskDto,
      user_author: user,
      lesson_task: lesson,
    });
    await this.taskRepository.save(newTask);

    var listSubmits: SubmitTask[] = [];
    for (let index = 0; index < users.length; index++) {
      let newSubmit = this.submitRepository.create({
        student: users[index].user,
        task: newTask,
      });
      listSubmits.push(newSubmit);
    }

    await this.submitRepository
      .createQueryBuilder()
      .insert()
      .into(SubmitTask)
      .values(listSubmits)
      .execute();

    return;
  }


  async findAllByLesson(id: string) {
    const task = await this.taskRepository.find({
      where: {
        lesson_task: { id: id },
      },
    });
    if (!task) throw new NotFoundException(`No task found`);

    return task;
  }

  async findOne(id: string) {
    const task = await this.taskRepository.findOneBy({ id: id });
    if (!task) throw new NotFoundException(`Task not found`);

    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskRepository.findOneBy({ id: id });

    if (!task) {
      throw new NotFoundException(`Task to update was not found`);
    }

    const updated = await this.taskRepository.merge(task, updateTaskDto);

    return await this.taskRepository.save(updated);
  }

  remove(id: string) {
    return this.taskRepository.delete(id);
    return `This action removes a #${id} task`;
  }
}
