import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ZipCode{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        default: null
    })
    name: string;

    @Column({
        default: null
    })
    attribute: string;

}