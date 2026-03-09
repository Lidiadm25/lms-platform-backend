import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { ValidRoles } from "../interfaces/validRoles";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id!:string;

    @Column({length: 100,
        unique: true
    })
    email!:string;
     @Column('text', {
        select: false,
    })
    password!:string;
     @Column('text')
    fullName!:string;

     @Column('bool', {
        default: true
    })
    isActive!:boolean;

    @Column({
        type: "set",
        enum: ValidRoles,
        default: [ValidRoles.user] 
    })
    roles!:string[]; 


    @BeforeInsert()
    checkFieldsBeforeInsert(){
        this.email = this.email.toLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate(){
        this.checkFieldsBeforeInsert();
    }
}
