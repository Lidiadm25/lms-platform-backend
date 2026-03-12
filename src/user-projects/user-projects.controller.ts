import { Body, Controller, Injectable, Post } from '@nestjs/common';
import { UserProjectsService } from './user-projects.service';
import { UserDtoProject } from './dtos/create-user-projects.dto';

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
}
