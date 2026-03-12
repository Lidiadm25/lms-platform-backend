import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubmitTaskService } from './submit-task.service';
import { CreateSubmitTaskDto } from './dto/create-submit-task.dto';
import { UpdateSubmitTaskDto } from './dto/update-submit-task.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';

@Controller('submit-task')
export class SubmitTaskController {
  constructor(private readonly submitTaskService: SubmitTaskService) {}

  @Post()
  create(@Body() createSubmitTaskDto: CreateSubmitTaskDto, @GetUser() user: User) {
    return this.submitTaskService.create(createSubmitTaskDto, user);
  }

  @Get()
  findAll() {
    return this.submitTaskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.submitTaskService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubmitTaskDto: UpdateSubmitTaskDto) {
    return this.submitTaskService.update(+id, updateSubmitTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.submitTaskService.remove(+id);
  }
}
