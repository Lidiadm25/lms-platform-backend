import { getRepositoryToken, InjectRepository } from "@nestjs/typeorm";
import { Lesson } from "src/lessons/entities/lesson.entity";
import { Project } from "src/project/entities/project.entity";

import { BeforeInsert, Column, Entity, Generated, getRepository, ManyToOne, OneToMany, PrimaryGeneratedColumn, Repository } from "typeorm";

@Entity("sections")
export class Section {

    @PrimaryGeneratedColumn('uuid')
    id!:string;
    
    @Column({ type : "varchar", nullable: false, length: "50"})
    title!:string;
    @Column({ type : "varchar", nullable: false, length: "50"})
    description!: string;

    /*@Column({type: "int"})
    order !: number;*/

    @ManyToOne(() => Project, (project) => project.units, {onDelete:"CASCADE"} )
    project!:Project;

    @OneToMany( () => Lesson, (lesson) => lesson.unit, {cascade:true, eager:true})
        lessons ?: Lesson[];


    /* @BeforeInsert()
    async generarNumero() {
    const ultimo = await getRepository(Section)
      .createQueryBuilder("section")
      .orderBy("section.order", "DESC")
      .getOne();

    this.order = ultimo ? ultimo.order + 1 : 1;
  }
  */
}



