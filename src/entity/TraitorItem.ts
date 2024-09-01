import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { WorkOrder } from "./WorkOrder";
import { Warehouse } from "./Warehouse";
import { TechnologicalUnits } from "./TechnologicalUnits";
import { WorkCenterClassification } from "./WorkCenterClassification";
import { TrafficType } from "./TrafficType";
import { Shipping } from "./Shipping";
import { MeasurmentUnits } from "./MeasurmentUnits";
import { AltrernativeChippers } from "./AlternativeChippers";

@Entity()
export class TraitorItem{
    
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, {nullable: true}) 
    @JoinColumn({ name: "fk_user_id" })
    @Column({
        default: 1
    })
    fk_user_id: User;

    @ManyToOne(() => AltrernativeChippers, { nullable: true })
    @JoinColumn({ name: "fk_alternative_chipper_id" })
    fk_alternative_chipper_id: AltrernativeChippers;

    @ManyToOne(() =>  Warehouse, {nullable : true})
    @JoinColumn({ name: "fk_warehouse_id" })
    fk_warehouse_id: Warehouse;

    @ManyToOne(() => MeasurmentUnits, { nullable: true })
    @JoinColumn({ name: "fk_mu_id" })
    fk_mu_id: MeasurmentUnits;

    @ManyToOne(() => WorkOrder, {nullable: true})
    @JoinColumn({ name: "fk_selected_workorder_id" })
    fk_selected_workorder_id: WorkOrder

    @Column({
        default: null
    })
    fk_workorder_id: string;
    
    @Column({
        default: null
    })
    selected_ammount: string; 

    @Column({
        type: "boolean",
        default: 0
    })
    has_sub_order: boolean

}