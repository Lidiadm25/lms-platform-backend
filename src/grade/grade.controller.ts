import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { GradeService } from './grade.service';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces/validRoles';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('grade')
export class GradeController {
  constructor(private readonly gradeService: GradeService) {}

  @Post()
  @Auth(ValidRoles.admin)
  @UseGuards(AuthGuard())
  create(@Body() createGradeDto: CreateGradeDto, @GetUser() user:User) {

    return this.gradeService.create(createGradeDto, user);
  }

  /* @Get()
  findAll() {
    return this.gradeService.findAll();
  }
 */

  /*
    All the grades from an user and a specific project
  */
  @Get(':idProject')
  @Auth(ValidRoles.user)
  @UseGuards(AuthGuard())
  findOne(@Param('idProject') id: string, @GetUser() user:User) {
    return this.gradeService.findAllProject(id, user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGradeDto: UpdateGradeDto) {
    return this.gradeService.update(+id, updateGradeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gradeService.remove(+id);
  }
}
