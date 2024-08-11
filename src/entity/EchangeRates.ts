import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class ExchangeRates{
    
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
    currency: string;

    @Column({
        type: "text",
        default: null
    })
    type: string; 
    
    @Column({
        type: "text",
        default: null
    })
    unit: string; 

    @Column({
        type: "text",
        default: null
    })
    course: string; 

    @Column({
        type: "text",
        default: null
    })
    status: string; 
    
    @Column({
        type: "text",
        default: null
    })
    course_value: string;

    @Column({
        type: "boolean",
        default:0
    })
    active: boolean; 

    @Column({
        default: null
    })
    created_at: Date;

}