import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class PriceType{
    
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
    type: string; 

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
        type: "boolean",
        default: null
    })
    active: boolean; 

    @Column({
        default: null
    })
    created_at: Date;
    
    

}