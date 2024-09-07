import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { MeasurmentUnits } from "./MeasurmentUnits";
import { Classification } from "./Classification";
import { WorkOrder } from "./WorkOrder";
import { AltrernativeChippers } from "./AlternativeChippers";
import { TechnologicalUnits } from "./TechnologicalUnits";
import { WorkCenterClassification } from "./WorkCenterClassification";

@Entity()
export class WorkSheet{

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, {nullable: true}) 
    @JoinColumn({ name: "fk_user_id" })
    @Column({
        default: 1
    })
    fk_user_id: User;

    @ManyToOne(() => WorkOrder, {nullable : true})
    @JoinColumn({ name: "fk_workorder_id" })
    fk_workorder_id: WorkOrder

    @ManyToOne(() => AltrernativeChippers, { nullable: true })
    @JoinColumn({ name: "fk_alternative_chiper_id" })
    fk_alternative_chiper_id: AltrernativeChippers;

    @ManyToOne(() => TechnologicalUnits, {nullable: true})
    @JoinColumn({ name: "fk_technological_unit_id" })
    fk_technological_unit_id: TechnologicalUnits;

    @ManyToOne(() => WorkCenterClassification, {nullable: true})
    @JoinColumn({ name: "fk_work_center_id" })
    fk_work_center_id: WorkCenterClassification

    @ManyToOne(() => MeasurmentUnits, { nullable: true })
    @JoinColumn({ name: "fk_mu_id" })
    fk_mu_id: MeasurmentUnits;

    @Column({
        default: null
    })
    ammount: string;

    @Column({
        default: null
    })
    start_date: Date; 

}