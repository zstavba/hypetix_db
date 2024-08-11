import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { MeasurmentUnits } from "./MeasurmentUnits";
import { ArticleType } from "./ArticleType";

@Entity()
export class Classification{
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
        default: null,
        collation: "utf8_slovenian_ci"
    })
    classification_id: number;

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    title: string; 


    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    status: string; 

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    network: string; 

    @Column({
        type: "boolean",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    active: boolean; 



    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        collation: "utf8_slovenian_ci"
    })
    created_at:  Date;


}