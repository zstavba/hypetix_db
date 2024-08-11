import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Country{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        default: null
    })
    name: string;
    
    @Column({
        default: null
    })
    type: string;

    @Column({
        default: null
    })
    name_ang: string;

    @Column({
        default: null
    })
    code: string;

    @Column({
        default: null
    })
    customs: string;

    @Column({
        default: null
    })
    eco_group: string; 

    @Column({
        default: null
    })
    contigment: string; 

    @Column({
        default: null
    })
    origin: string; 

    @Column({
        default: null
    })
    status: string; 

    @Column({
        default: 0
    })
    active: boolean;


}