import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserProject } from './entities/user-project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDtoProject } from './dtos/create-user-projects.dto';
import { Project } from 'src/project/entities/project.entity';
import { UpdatedUserDtoProject } from './dtos/update-user-projects.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { User } from 'src/auth/entities/user.entity';
import { usersProjectsDto } from './dtos/create-users-project.dto';

@Injectable()
export class UserProjectsService {
  constructor(
    @InjectRepository(UserProject)
    private readonly userProjectRepository: Repository<UserProject>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAllPerProject(id: string, paginationDto: PaginationDto) {
    // Search that the project exists
    const { limit = 10, offset = 0 } = paginationDto;
    const project = await this.projectRepository.findOneBy({ id: id });

    if (!project) {
      throw new NotFoundException(`Project not found`);
    }

    const users = await this.userProjectRepository
      .createQueryBuilder('users-projects')
      .leftJoinAndSelect('users-projects.project', 'project')
      .leftJoinAndSelect('users-projects.user', 'user')
      .where('project.id = :id', { id })
      .getMany();

    const totalUsers = users.length;

    return {
      count: totalUsers,
      pages: Math.ceil(totalUsers / limit),
      total: totalUsers,
      users,
    };
  }

  async queryDependingUserData(
    dto: UserDtoProject,
  ): Promise<boolean | undefined> {
    var query;

    if (dto) {
      if (dto.userEmail) {
        query = {
          user: { email: dto.userEmail },
          project: { id: dto.projectId },
        };
      } else {
        query = {
          user: { id: dto.userId },
          project: { id: dto.projectId },
        };
      }
      const inscription = await this.verificateInscription(query);
      return inscription != null;
    }
    return false;
  }

  async verificateInscription(query: any) {
    return await this.userProjectRepository.findOneBy(query);
  }

  async create(dto: UserDtoProject) {
    // Verificate its not already asigned
    if ((await this.queryDependingUserData(dto)) == true || undefined) {
      throw new BadRequestException(
        `The user is already asigned to the project`,
      );
    }

    /*
        PARA CALCULAR LA DURACIÓN DEL CURSO
        */
    const project = await this.projectRepository.findOneBy({
      id: dto.projectId,
    });

    const user = await this.userRepository.findOne({
      where: [{ id: dto.userId }, { email: dto.userEmail }],
    });

    if (!user || !project) {
      throw new NotFoundException(`Project or user not found with given data`);
    }
    const date = new Date();
    date.setDate(date.getDate() + project!.duration);

    const newUser = this.userProjectRepository.create({
      user: { id: user!.id },
      project: { id: dto.projectId },
      end_date: date,
    });

    return await this.userProjectRepository.save(newUser);
  }

  async createMany(dto: usersProjectsDto) {
    // BULK INSERT
    // Verificate the data
    if (dto.users.length == 0) {
      throw new BadRequestException(`No data was given`);
    }

    // Collect the project
    const project = await this.projectRepository.findOneBy({
      id: dto.users[0].projectId,
    });

    const date = new Date();
    date.setDate(date.getDate() + project!.duration);
    var values: UserProject[] = [];
    for (let index = 0; index < dto.users.length; index++) {
      let userId = await this.userRepository.findOne({
        where: { email: dto.users[index].userEmail },
      });

      values[index] = this.userProjectRepository.create({
        user: { id: userId!.id },
        project: { id: dto.users[index].projectId },
        end_date: date,
      });
    }

    return await this.userProjectRepository
      .createQueryBuilder()
      .insert()
      .into(UserProject)
      .values(values)
      .execute();
  }

  async update(id: string, pId: string, dto: UpdatedUserDtoProject) {
    const user_pro = await this.userProjectRepository.findOneBy({
      user: { id: id },
      project: { id: pId },
    });

    if (!user_pro) {
      throw new NotFoundException(`User not asigned to the project`);
    }

    const updated = await this.userProjectRepository.merge(user_pro, dto);

    return await this.userProjectRepository.save(updated);
  }
}
