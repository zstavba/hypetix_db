import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Tax{
    
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
    ident: string;

    @Column({
        default: null
    })
    title: string;

    @Column({
        default: null
    })
    stage: string;

    @Column({
        default: null
    })
    type: string;

    @Column({
        default: 0
    })
    active: boolean;

    @Column({
        default: null
    })
    created_at: Date;

}