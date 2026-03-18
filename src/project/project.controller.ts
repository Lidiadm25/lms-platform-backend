import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces/validRoles';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @Auth(ValidRoles.admin)
  create(@Body() createProjectDto: CreateProjectDto,
  @GetUser() user:User
  ) {
 
    return this.projectService.create(createProjectDto, user);
  }


  @Get()
  @Auth(ValidRoles.admin, ValidRoles.user)
  findAll(@Query() paginationDto:PaginationDto, @GetUser() user: User) {
    return this.projectService.findAll(paginationDto, user);
  }

  @Get('search/:query')
  searchByQuery(@Query() paginationDto:PaginationDto,@Param('query') query: string){
    return this.projectService.findFiltered(paginationDto,query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(id);
  }
}
