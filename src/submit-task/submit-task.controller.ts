import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SubmitTaskService } from './submit-task.service';
import { CreateSubmitTaskDto } from './dto/create-submit-task.dto';
import { UpdateSubmitTaskDto } from './dto/update-submit-task.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { RoleProtected } from 'src/auth/decorators/role-protected.decorator';
import { ValidRoles } from 'src/auth/interfaces/validRoles';
import { UserRoleGuard } from 'src/auth/guards/user-role/user-role.guard';
import { AuthGuard } from '@nestjs/passport';
import { Auth } from 'src/auth/decorators/auth.decorator';

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
  findSubmitByTask(@Param('id') id:string, @GetUser() user: User)
  {
    console.log("aa");
    
   return this.submitTaskService.findByTask(id, user);
  }
  

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSubmitTaskDto: UpdateSubmitTaskDto,
  ) {
    return this.submitTaskService.update(id, updateSubmitTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.submitTaskService.remove(id);
  }
}
