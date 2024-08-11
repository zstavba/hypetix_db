import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Warehouse{
    
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
    title: string; 

    @Column({
        default: null
    })
    status: string;  

    @Column({
        default: null
    })
    movement: string;  

    @Column({
        type: "boolean",
        default: 0
    })
    active: boolean; 

    @Column({
        default: null
    })
    unit: string;  

    @Column({
        default: null
    })
    stock_type: string; 

    @Column({
        default: null
    })
    konto: string;

    @Column({
        default: null
    })
    stm: string; 

    @Column({
        default: null
    })
    created_at: Date; 

}