import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Classification } from "./Classification";

@Entity()
export class TechnologicalUnits{
    
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, {nullable: true}) 
    @JoinColumn({ name: "fk_user_id" })
    @Column({
        default: 1
    })
    fk_user_id: User;

    @ManyToOne(() => Classification, {nullable : true})
    @JoinColumn({ name: "fk_classification_id" })
    fk_classification_id: Classification;

    @Column({
        default: null
    })
    title: string;

    @Column({
        type: "boolean",
        default: 0
    })
    active: boolean; 


}