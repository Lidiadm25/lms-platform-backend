import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { UserDtoProject } from './dtos/create-user-projects.dto';
import { UpdatedUserDtoProject } from './dtos/update-user-projects.dto';
import { UserProjectsService } from './user-projects.service';

import { Auth } from 'src/auth/decorators/auth.decorator';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { ValidRoles } from 'src/auth/interfaces/validRoles';
import { usersProjectsDto } from './dtos/create-users-project.dto';

@Controller('user-projects')
export class UserProjectsController {
  constructor(private readonly service: UserProjectsService) {}

  @Get(':id')
  getAll(@Param('id') id: string, @Query() paginationDto: PaginationDto) {
    return this.service.getAllPerProject(id, paginationDto);
  }

  @Get('students/per-teacher')
  @Auth()
  getStudents(@GetUser() user: User) {
    return this.service.getAllStudents(user);
  }

  @Get('finish/all')
  @Auth(ValidRoles.admin)
  finishAllCourses(@GetUser() user: User) {
    return this.service.finishAll(user);
  }

  @Get('students/per-teacher/ever')
  @Auth()
  getStudentsEver(@Param('id') id: string, @GetUser() user: User) {
    return this.service.getAllStudentsEver(user);
  }

  @Get('projects/:id')
  getProjects(@Param('id') id: string) {
    return this.service.projectsPerUser(id);
  }

  @Get('project/:id')
  getAllNoPage(@Param('id') id: string) {
    return this.service.getAll(id);
  }

  @Post()
  @Auth(ValidRoles.user)
  addUser(@Body() dto: UserDtoProject) {
    if (dto.userEmail == null && dto.userId == null) {
      throw new Error(`Lack of information`);
    }

    return this.service.create(dto);
  }

  @Post('bulk')
  @Auth(ValidRoles.admin)
  addUsers(@Body() dto: usersProjectsDto) {
    return this.service.createMany(dto);
  }

  @Delete('bulk')
  @Auth(ValidRoles.admin)
  deleteUsers(@Body() ids: string[]) {
    return this.service.bulkDelete(ids);
  }

  @Patch('project/:id/finish')
  @Auth(ValidRoles.user)
  update(
    @Param('id') pId: string,
    @GetUser() user: User,
    @Body() dto: UpdatedUserDtoProject,
  ) {
    return this.service.update(pId, user, dto);
  }

  @Get('check-status/:idProject')
  @Auth(ValidRoles.user)
  getChecked(@GetUser() user: User, @Param('idProject') id: string) {
    return this.service.checkEnroll(user, id);
  }
}
