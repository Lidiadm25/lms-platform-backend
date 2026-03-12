import { Injectable } from '@nestjs/common';
import { CreateSubmitTaskDto } from './dto/create-submit-task.dto';
import { UpdateSubmitTaskDto } from './dto/update-submit-task.dto';

@Injectable()
export class SubmitTaskService {
  create(createSubmitTaskDto: CreateSubmitTaskDto) {
    return 'This action adds a new submitTask';
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
