import { Lesson } from 'src/lesson/entities/lesson.entity';
import { Project } from 'src/project/entities/project.entity';

import {
  AfterInsert,
  AfterUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('sections')
export class Section {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', nullable: false, length: '50' })
  title!: string;
  @Column({ type: 'varchar', nullable: false, length: '50' })
  description!: string;

  @ManyToOne(() => Project, (project) => project.units, { onDelete: 'CASCADE' })
  project!: Project;

  // Eager true aquí hace que se carguen automáticamente!!!!!!
  @OneToMany(() => Lesson, (lesson) => lesson.unit, { cascade: true })
  lessons!: Lesson[];

  /* @BeforeInsert()
    async generarNumero() {
    const ultimo = await getRepository(Section)
      .createQueryBuilder("section")
      .orderBy("section.order", "DESC")
      .getOne();

    this.order = ultimo ? ultimo.order + 1 : 1;
  }
  */

  // @AfterUpdate()
  // @AfterInsert()
  // updateLastModified(){
  //   console.log(this)
  //   this.project.last_modified = new Date();
  // }
}
