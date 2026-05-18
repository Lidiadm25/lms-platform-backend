import { url } from 'inspector';
import { Lesson } from 'src/lesson/entities/lesson.entity';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Task } from 'src/tasks/entities/task.entity';
import { MoreThan, Repository } from 'typeorm';
import { CreateSubmitTaskDto } from './dto/create-submit-task.dto';
import { UpdateSubmitTaskDto } from './dto/update-submit-task.dto';
import { SubmitTask } from './entities/submit-task.entity';
import { Files } from 'src/files/entities/file.entity';
import { StorageService } from 'src/files/storage/storage.service';

@Injectable()
export class SubmitTaskService {
  constructor(
    @InjectRepository(SubmitTask)
    private readonly submitRepository: Repository<SubmitTask>,
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(Files)
    private readonly filesRepository: Repository<Files>,
    private readonly storageService: StorageService,
  ) {}

  async create(createSubmitTaskDto: CreateSubmitTaskDto, user: User) {
    // Busco la tarea (padre)
    // const task = await this.taskRepository.findOneBy({
    //   id: createSubmitTaskDto.taskId,
    // });
    // if (!task) {
    //   throw new NotFoundException(
    //     `Task to submit not found with id ${createSubmitTaskDto.taskId}`,
    //   );
    // }
    // if (task.getActive() == false) {
    //   throw new UnauthorizedException(`Task out of date`);
    // }
    // const newSubmit = this.submitRepository.create({
    //   url_file:
    //   task: task,
    //   student: user,
    // });
    // return await this.submitRepository.save(newSubmit);
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

  async update(
    id: string,
    updateSubmitTaskDto: UpdateSubmitTaskDto,
    files?: Express.Multer.File[],
  ) {
    const submit = await this.submitRepository.findOne({
      where: { id: id },
      relations: { url_file: true, task: true },
    });

    if (!submit) {
      throw new NotFoundException(`The submit was not found`);
    }
    const maxFileSize = +submit.task.fileSize;

    if (files && files.length > 0) {
      for (const file of files) {
        if (file.size > maxFileSize)
          throw new BadRequestException(`Over max file size`);
      }
      if (submit.url_file && submit.url_file.length > 0) {
        const oldFiles = submit.url_file.map((file) => file.id);
        await this.filesRepository.update(oldFiles, { submit: undefined });
      }

      const uploadFiles = await this.storageService.uploadMultipleFiles(files);
      const ids = uploadFiles.map((file) => file.id);
      await this.filesRepository.update(ids, { submit: submit });
    }

    const result = await this.submitRepository.update(id, {
      date_send: new Date(),
    });

    return await this.submitRepository.findOne({
      where: { id: id },
      relations: { url_file: true },
    });
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
        task: {
          lesson_task: {
            unit: {
              project: {
                students: {
                  user: {
                    id: id,
                  },
                  end_date: MoreThan(new Date()),
                },
              },
            },
          },
        },
      },
      relations: {
        task: {
          lesson_task: true,
        },
        student: {
          userProjects: true,
        },
      },
    });
    console.log(result[0]);

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
      relations: {
        url_file: true,
      },
    });

    if (!result)
      throw new NotFoundException(`No task found from user with id ${userId}`);

    if (result.url_file && result.url_file.length > 0) {
      for (const file of result.url_file) {
        file.url = await this.storageService.getFileUrl(file.key);
      }
    }
    console.log(result);
    return result;
  }

  // todo sacar grades
  async findByTask(id: string, user: User) {
    const submit = await this.submitRepository
      .createQueryBuilder('submit')
      .leftJoinAndSelect('submit.url_file', 'files')
      .where('submit.task = :id', { id: id })
      .andWhere('submit.student = :idUser', { idUser: user.id })
      .getOne();
    return submit;
  }
}
