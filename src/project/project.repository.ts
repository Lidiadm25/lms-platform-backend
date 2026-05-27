import { Injectable } from "@nestjs/common";
import { Project } from "./entities/project.entity";
import { User } from "src/auth/entities/user.entity";
import { PaginationDto } from "src/common/dtos/pagination.dto";
import { Repository, DataSource } from "typeorm";
import { CreateProjectDto } from "./dto/create-project.dto";


@Injectable()
export class ProjectRepository extends Repository<Project> {
  constructor(private dataSource: DataSource) {
    super(Project, dataSource.createEntityManager());
  }

  async createProject(createProjectDto: CreateProjectDto, user: User, imageFile: any) {
    const project = this.create({
      ...createProjectDto,
      author: user,
      image: imageFile,
    });
    return this.save(project);
  }

  async findFilteredProjects(paginationDto: PaginationDto, query: string) {
    const limit = paginationDto.limit || 9;
    const querySQL = this.createQueryBuilder('projects')
      .take(limit)
      .skip(paginationDto.offset)
      .leftJoinAndSelect('projects.category', 'category')
      .leftJoinAndSelect('projects.image', 'image')
      .where('1=1');

    if (paginationDto.category && paginationDto.category.length != 0) {
      querySQL.andWhere('category.id = :id', { id: paginationDto.category });
    }

    if (query.trim().length) {
      querySQL.andWhere('title like :query', { query: `%${query}%` });
    }

    return querySQL.getManyAndCount();
  }

  async findAllUserProjects(limit: number, offset: number, category: string) {
    const query = this.createQueryBuilder('projects')
      .leftJoinAndSelect('projects.units', 'units')
      .leftJoinAndSelect('projects.students', 'students')
      .leftJoinAndSelect('projects.author', 'author')
      .leftJoinAndSelect('projects.category', 'category')
      .leftJoinAndSelect('projects.image', 'files')
      .take(limit)
      .skip(offset)
      .orderBy('projects.title', 'DESC')
      .where('projects.isActive=true');

    if (category && category.length != 0) {
      query.andWhere('category.name = :name', { name: category });
    }

    return query.getManyAndCount();
  }

  async findAllAdminProjects(limit: number, offset: number, userId: string) {
    return this.findAndCount({
      take: limit,
      skip: offset,
      relations: {
        units: true,
        students: true,
        author: true,
        image: true,
      },
      order: { title: 'DESC' },
      where: { author: { id: userId } },
    });
  }

  async findProjectById(id: string) {
    return this.findOne({
      where: { id },
      relations: ['units', 'units.lessons', 'author', 'category', 'image'],
    });
  }
}