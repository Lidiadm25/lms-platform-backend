import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserProject } from './entities/user-project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDtoProject } from './dtos/create-user-projects.dto';
import { Project } from 'src/project/entities/project.entity';
import { UpdatedUserDtoProject } from './dtos/update-user-projects.dto';
import { throwError } from 'rxjs';

@Injectable()
export class UserProjectsService {

    constructor(
        @InjectRepository(UserProject)
        private readonly userProjectRepository:Repository<UserProject>,
        @InjectRepository(Project)
        private readonly projectRepository:Repository<Project>
    ) {
        
    }

    async getAllPerProject(id: string){
        // Search that the project exists
        console.log("parametro: " + id)
        const project = await this.projectRepository.findOneBy({id: id});
        
        if(!project){
            throw new NotFoundException(`Project not found`)
        }
        
        const users = await this.userProjectRepository.find({
            select: {
                user: {
                    fullName: true,
                    email: true,
                },
                project: {
                    title: true
                }
            },
            relations: {
                user: true,
                project: true
            },
            where: {project: {
                id: id,
            }}
        });
         console.log(users)
        if(!users) {
            throw new NotFoundException('no data found')
        }

        return users;
    }


    async create(dto: UserDtoProject){
        // Verificate its not already asigned

        const inscription = await this.userProjectRepository.findOneBy({
           user : { id: dto.userId},
           project: {id: dto.projectId}
        })

        if(inscription != null){
            throw new BadRequestException(`The user is already asigned to the project`)
        }

         /*
        PARA CALCULAR LA DURACIÓN DEL CURSO
        */
       const project = await this.projectRepository.findOneBy({id: dto.projectId});
       const date = new Date();
       date.setDate(date.getDate() + project!.duration);

        const newUser = this.userProjectRepository.create({
            user : { id: dto.userId},
           project: {id: dto.projectId},
           end_date: date

        })
       

        return await this.userProjectRepository.save(newUser)

    }

    async update(id:string, pId:string,dto : UpdatedUserDtoProject){

        const user_pro = await this.userProjectRepository.findOneBy(
            {
            user : { id: id},
            project: {id: pId}
            }
        )

        if(!user_pro){
            throw new NotFoundException(`User not asigned to the project`)
        }

        const updated = await this.userProjectRepository.merge(user_pro, dto);

        return await this.userProjectRepository.save(updated);

    }

}
