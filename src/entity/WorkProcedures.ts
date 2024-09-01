import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { MeasurmentUnits } from "./MeasurmentUnits";
import { Classification } from "./Classification";

@Entity()
export class WorkProcedures{

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, {nullable: true}) 
    @JoinColumn({ name: "fk_user_id" })
    @Column({
        default: 1
    })
    fk_user_id: User;
    
    @ManyToOne(() => MeasurmentUnits, { nullable: true })
    @JoinColumn({ name: "fk_em_id" })
    fk_em_id: MeasurmentUnits;

    @ManyToOne(() =>  Classification, { nullable : true })
    @JoinColumn({ name: "fk_classification_id" })
    fk_classification_id: Classification

    @Column({
        default: null
    })
    title: string; 

    @Column({
        default: null
    })
    type: string; 

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        collation: "utf8_slovenian_ci"
    })
    created_at: Date;
 


}