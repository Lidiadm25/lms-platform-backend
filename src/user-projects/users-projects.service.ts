import { Injectable } from '@nestjs/common';
import { CreateUsersProjectDto } from './dto/create-users-project.dto';
import { UpdateUsersProjectDto } from './dto/update-users-project.dto';

@Injectable()
export class UsersProjectsService {
  create(createUsersProjectDto: CreateUsersProjectDto) {
    return 'This action adds a new usersProject';
  }

  findAll() {
    return `This action returns all usersProjects`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usersProject`;
  }

  update(id: number, updateUsersProjectDto: UpdateUsersProjectDto) {
    return `This action updates a #${id} usersProject`;
  }

  remove(id: number) {
    return `This action removes a #${id} usersProject`;
  }
}
