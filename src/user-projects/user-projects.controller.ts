import {
  Body,
  Controller,
  Delete,
  Get,
  Injectable,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UserProjectsService } from './user-projects.service';
import { UserDtoProject } from './dtos/create-user-projects.dto';
import { UpdatedUserDtoProject } from './dtos/update-user-projects.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

import { usersProjectsDto } from './dtos/create-users-project.dto';

@Controller('user-projects')
export class UserProjectsController {
  constructor(private readonly service: UserProjectsService) {}

  @Get(':id')
  getAll(@Param('id') id: string, @Query() paginationDto: PaginationDto) {
    return this.service.getAllPerProject(id, paginationDto);
  }

  @Get('projects/:id')
  getProjects(@Param('id') id:string){
    return this.service.projectsPerUser(id)
  }

  @Post()
  addUser(@Body() dto: UserDtoProject) {
    if (dto.userEmail == null && dto.userId == null) {
      throw new Error(`Lack of information`);
    }

    return this.service.create(dto);
  }

  @Post('bulk')
  addUsers(@Body() dto: usersProjectsDto) {
    return this.service.createMany(dto);
  }

  @Delete('bulk')
  deleteUsers(@Body() ids: string[]){
    return this.service.bulkDelete(ids)
  }

  // FEO MUY FEO
  @Patch('/user/:userId/project/:projectId')
  update(
    @Param('userId') id: string,
    @Param('projectId') pId: string,
    @Body() dto: UpdatedUserDtoProject,
  ) {
    return this.service.update(id, pId, dto);
  }
}
