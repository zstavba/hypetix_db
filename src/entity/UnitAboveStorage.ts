import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class UnitAboveStorage{
    
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, {nullable: true}) 
    @JoinColumn({ name: "fk_user_id" })
    @Column({
        default: 1
    })
    fk_user_id: User;

    @ManyToOne(() => User, {nullable: true})
    @JoinColumn({
        name: "fk_leader_id"
    })
    fk_leader_id: User;


    @Column({
        default: null,
        type: "text"
    })
    stm: string;


    @Column({
        default: null,
        type: "text"
    })
    title: string; 
    
    
    @Column({
        default: null,
        type: "text"
    })
    points: number; 


    @Column({
        default: null,
        type: "text"
    })
    extra_1: string;


    @Column({
        default: null,
        type: "text"
    })
    extra_2: string; 


    @Column({
        default: null,
        type: "text"
    })
    extra_3: string;


    @Column({
        default: null,
        type: "text"
    })
    extra_4: string;


    @Column({
        default: null,
        type: "text"
    })
    extra_5: string; 

    @Column({
        default: null,
        type: "text"
    })
    type: string; 

    @Column({
        default: null,
        type: "boolean"
    })
    active: boolean; 

    @Column({
        default: null
    })
    created_at: Date;

    


}