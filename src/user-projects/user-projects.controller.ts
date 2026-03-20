import { Body, Controller, Get, Injectable, Param, Patch, Post, Query } from '@nestjs/common';
import { UserProjectsService } from './user-projects.service';
import { UserDtoProject } from './dtos/create-user-projects.dto';
import { UpdatedUserDtoProject } from './dtos/update-user-projects.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces/validRoles';

@Controller('user-projects')
export class UserProjectsController {
    constructor(
        private readonly service : UserProjectsService,

    ){

    }

    @Get(':id')
    getAll(@Param('id') id: string, @Query() paginationDto:PaginationDto){
        return this.service.getAllPerProject(id, paginationDto);
    }
    
    @Post()
    addUser(@Body() dto: UserDtoProject){
        
        return this.service.create(dto);
    } 

    @Patch('/user/:userId/project/:projectId')
    update(
        @Param('userId') id: string,
        @Param('projectId') pId: string,
        @Body() dto: UpdatedUserDtoProject){
        return this.service.update(id,pId,dto)
    }
}
