import { Project } from 'src/project/entities/project.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id!: string;
  @Column({ type: 'varchar' })
  name!: string;

  @OneToMany(() => Project, (project) => project.category)
  project!: Project[];
}
