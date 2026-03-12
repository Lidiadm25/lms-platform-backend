import { Body, Controller, Injectable, Param, Patch, Post } from '@nestjs/common';
import { UserProjectsService } from './user-projects.service';
import { UserDtoProject } from './dtos/create-user-projects.dto';
import { UpdatedUserDtoProject } from './dtos/update-user-projects.dto';

@Controller('user-projects')
export class UserProjectsController {
    constructor(
        private readonly service : UserProjectsService,

    ){

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
