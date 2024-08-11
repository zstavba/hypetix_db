import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { MeasurmentUnits } from "./MeasurmentUnits";

@Entity()
export class CustomTariffs{
    
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, {nullable: true}) 
    @JoinColumn({ name: "fk_user_id" })
    @Column({
        default: 1
    })
    fk_user_id: User;

    @ManyToOne(() => MeasurmentUnits, {nullable: true})
    @JoinColumn({ name: "fk_em_id" })
    fk_em_id: MeasurmentUnits

    @Column({
        default: null
    })
    ident: string;

    @Column({
        default: null
    })
    name: string;

    @Column({
        default: null
    })
    stage: string;

    @Column({
        default: null
    })
    consigment: string;

    @Column({
        default: null
    })
    position: string;

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