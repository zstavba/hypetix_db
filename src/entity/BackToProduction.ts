import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { GroupType } from "./GroupType";
import { Warehouse } from "./Warehouse";
import { WorkOrder } from "./WorkOrder";
import { TechnologicalUnits } from "./TechnologicalUnits";
import { TrafficType } from "./TrafficType";
import { MeasurmentUnits } from "./MeasurmentUnits";
import { WorkCenterClassification } from "./WorkCenterClassification";

@Entity()
export class BackToProduction{
    
        
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, {nullable: true}) 
    @JoinColumn({ name: "fk_user_id" })
    @Column({
        default: 1
    })
    fk_user_id: User;

    @ManyToOne(() => Warehouse, { nullable: true })
    @JoinColumn({ name: "fk_warehouse_id" })
    fk_warehouse_id: Warehouse; 

    
    @ManyToOne(() => WorkOrder, { nullable: true })
    @JoinColumn({ name: "fk_workorder_id" })
    fk_workorder_id: WorkOrder;

    @ManyToOne(() => TechnologicalUnits, {nullable: true})
    @JoinColumn({ name: "fk_technological_unit_id" })
    fk_technological_unit_id: TechnologicalUnits;

    @ManyToOne( () => TrafficType, { nullable: true } )
    @JoinColumn({ name: "fk_traffic_type_id" })
    fk_trafic_type_id: TrafficType;

    @ManyToOne(() => MeasurmentUnits, { nullable: true })
    @JoinColumn({ name: "fk_mu_id" })
    fk_mu_id: MeasurmentUnits;

    @ManyToOne(() => WorkCenterClassification, {nullable: true})
    @JoinColumn({ name: "fk_work_center_id" })
    fk_work_center_id: WorkCenterClassification;

    @Column({
        default: null
    })
    start_date: Date;

    @Column({
        default: null
    })
    weight: string; 


}