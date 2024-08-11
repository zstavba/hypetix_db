import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class CostCenters{
    
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
        default: null,
        type: "text",
        collation: "utf8_slovenian_ci",
    })
    stm: string;

    @Column({
        default: null,
        type: "text",
        collation: "utf8_slovenian_ci",
    })
    status: string;

    @Column({
        default: null,
        type: "text",
        collation: "utf8_slovenian_ci",
    })
    type: string;

    @Column({
        default: null,
        type: "text",
        collation: "utf8_slovenian_ci",
    })
    point: string;

    @Column({
        default: null,
        type: "boolean",
        collation: "utf8_slovenian_ci",
    })
    active: boolean;

    @Column({
        default: null,
        type: "text",
        collation: "utf8_slovenian_ci",
    })
    above_stm: string;



    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        collation: "utf8_slovenian_ci"
    })
    created_at:  Date;
}