import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { WorkOrder } from "./WorkOrder";
import { Warehouse } from "./Warehouse";
import { TechnologicalUnits } from "./TechnologicalUnits";
import { WorkCenterClassification } from "./WorkCenterClassification";
import { TrafficType } from "./TrafficType";
import { Shipping } from "./Shipping";
import { MeasurmentUnits } from "./MeasurmentUnits";

@Entity()
export class Traitor{
    
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
    fk_workorder_id: WorkOrder;

    @ManyToOne(() => Warehouse, { nullable: true })
    @JoinColumn({ name: "fk_warehouse_id" })
    fk_warehouse_id: Warehouse;

    @ManyToOne(() => TechnologicalUnits, { nullable: true })
    @JoinColumn({ name: "fk_technological_units_id" })
    fk_technological_units_id: TechnologicalUnits;

    @ManyToOne(() => WorkCenterClassification, {nullable: true}) 
    @JoinColumn({ name: "fk_work_center_id" })
    fk_work_center_id: WorkCenterClassification;

    @ManyToOne(() =>  TrafficType, { nullable : true })
    @JoinColumn({ name: "fk_traffic_type_id" })
    fk_traffic_type_id: TrafficType;

    @ManyToOne(() => Shipping, {nullable : true})
    @JoinColumn({ name: "fk_shipping_method_id" })
    fk_shipping_method_id: Shipping;

    @ManyToOne(() => MeasurmentUnits, {nullable: true})
    @JoinColumn({ name: "fk_mu_id" })
    fk_mu_id: MeasurmentUnits

    @Column({
        default: null
    })
    start_date: Date;

    @Column({
        default: null
    })
    ammount: string; 

    @Column({
        type: 'boolean',
        default: 0
    })
    open: boolean;

    



}