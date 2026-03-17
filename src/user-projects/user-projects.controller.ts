import { Body, Controller, Get, Injectable, Param, Patch, Post, Query } from '@nestjs/common';
import { UserProjectsService } from './user-projects.service';
import { UserDtoProject } from './dtos/create-user-projects.dto';
import { UpdatedUserDtoProject } from './dtos/update-user-projects.dto';

@Controller('user-projects')
export class UserProjectsController {
    constructor(
        private readonly service : UserProjectsService,

    ){

    }

    @Get(':id')
    getAll(@Param('id') id: string){
        return this.service.getAllPerProject(id);
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
