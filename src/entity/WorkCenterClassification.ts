import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class WorkCenterClassification{

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, {nullable: true}) 
    @JoinColumn({ name: "fk_user_id" })
    @Column({
        default: 1
    })
    fk_user_id: User;

    @Column({
        type: "text",
        default: null
    })
    group_type: string; 

    @Column({
        type: "text",
        default: null
    })
    group_id: string; 

    @Column({
        type: "text",
        default: null
    })
    title: string;  

    @Column({
        type: "boolean",
        default: 0
    })
    active: boolean;

    @Column({
        type: "text",
        default: null
    })
    extra_1: string; 

    @Column({
        type: "text",
        default: null
    })
    extra_2: string;

    @Column({
        type: "text",
        default: null
    })
    extra_3: string; 

    @Column({
        default: null
    })
    created_at: Date;

    @Column({
        type: "text",
        default: null
    })
    status: string; 

    @Column({
        type: "text",
        default: null
    })
    idg: string; 
    
    


}