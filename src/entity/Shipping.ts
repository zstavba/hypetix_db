import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Shipping{
    
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
    title: string; 


    @Column({
        type: "text",
        default: null
    })
    status: string


    @Column({
        type: "boolean",
        default: null
    })
    active: boolean;


    @Column({
        type: "text",
        default: null
    })
    attribute: string;


    @Column({
        default: null
    })
    created_at: Date; 



}