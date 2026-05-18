import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { RoleProtected } from 'src/auth/decorators/role-protected.decorator';
import { User } from 'src/auth/entities/user.entity';
import { UserRoleGuard } from 'src/auth/guards/user-role/user-role.guard';
import { ValidRoles } from 'src/auth/interfaces/validRoles';
import { CreateSubmitTaskDto } from './dto/create-submit-task.dto';
import { UpdateSubmitTaskDto } from './dto/update-submit-task.dto';
import { SubmitTaskService } from './submit-task.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('submit-task')
export class SubmitTaskController {
  constructor(private readonly submitTaskService: SubmitTaskService) {}

  @Post()
  @RoleProtected(ValidRoles.admin, ValidRoles.user)
  @UseGuards(AuthGuard(), UserRoleGuard)
  create(
    @Body() createSubmitTaskDto: CreateSubmitTaskDto,
    @GetUser() user: User,
  ) {
    return this.submitTaskService.create(createSubmitTaskDto, user);
  }

  @Get()
  findAll() {
    return this.submitTaskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.submitTaskService.findOne(id);
  }

  @Get('/user/:id')
  findTasksUser(@Param('id') id: string) {
    return this.submitTaskService.findByUser(id);
  }

  @Get('/task/:id')
  @Auth()
  findSubmitByTask(@Param('id') id: string, @GetUser() user: User) {
    return this.submitTaskService.findByTask(id, user);
  }

  @Get('review-task/:idUser/:idTask')
  findSubmitOfUserByTask(
    @Param('idUser') id: string,
    @Param('idTask') idTask: string,
  ) {
    return this.submitTaskService.findByUserTask(id, idTask);
  }

  @Patch(':id')
  @UseInterceptors(FilesInterceptor('files'))
  update(
    @Param('id') id: string,
    @Body() updateSubmitTaskDto: UpdateSubmitTaskDto,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    return this.submitTaskService.update(id, updateSubmitTaskDto, files);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.submitTaskService.remove(id);
  }
}
