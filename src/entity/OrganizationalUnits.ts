import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class OrganizationalUnits{
    
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, {nullable: true}) 
    @JoinColumn({ name: "fk_user_id" })
    @Column({
        default: 1
    })
    fk_user_id: User;

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: "fk_leader_id" })
    fk_leader_id: User; 
    
    @Column({
        type: "text",
        default: null
    })
    stm: string

    @Column({
        type: "text",
        default: null
    })
    above_stm: string; 

    @Column({
        type: "text",
        default: null
    })
    title: string; 

    @Column({
        type: "text",
        default: null
    })
    status: string; 

    @Column({
        type: "text",
        default: null
    })
    type: string; 

    @Column({
        type: "boolean",
        default: null
    })
    active: boolean;

    @Column({
        default: null
    })
    created_at: Date; 


}