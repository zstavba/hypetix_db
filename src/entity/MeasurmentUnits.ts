import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class MeasurmentUnits{
    
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
    idg: string;

    @Column({
        default: null
    })
    title: string;

    @Column({
        type: "boolean",
        default: 0
    })
    active: boolean;

    @Column({
        default: null
    })
    created_at: Date;

}