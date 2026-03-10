import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersProjectsService } from './users-projects.service';
import { CreateUsersProjectDto } from './dto/create-users-project.dto';
import { UpdateUsersProjectDto } from './dto/update-users-project.dto';

@Controller('users-projects')
export class UsersProjectsController {
  constructor(private readonly usersProjectsService: UsersProjectsService) {}

  @Post()
  create(@Body() createUsersProjectDto: CreateUsersProjectDto) {
    return this.usersProjectsService.create(createUsersProjectDto);
  }

  @Get()
  findAll() {
    return this.usersProjectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersProjectsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsersProjectDto: UpdateUsersProjectDto) {
    return this.usersProjectsService.update(+id, updateUsersProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersProjectsService.remove(+id);
  }
}
