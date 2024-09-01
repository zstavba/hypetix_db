import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class TechnologicalProcesses{
    
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, {nullable: true}) 
    @JoinColumn({ name: "fk_user_id" })
    @Column({
        default: 1
    })
    fk_user_id: User;

    @Column({
        default: null
    })
    type: string; 

    @Column({
        default: null
    })
    group_id: string;


    @Column({
        default: null
    })
    title: string; 


    @Column({
        type: "boolean",
        default: null
    })
    active: boolean;


}