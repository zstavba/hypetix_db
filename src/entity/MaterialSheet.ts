import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Warehouse } from "./Warehouse";
import { WorkCenterClassification } from "./WorkCenterClassification";
import { WorkOrder } from "./WorkOrder";
import { TechnologicalUnits } from "./TechnologicalUnits";

@Entity()
export class MaterialSheet{
    
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, {nullable: true}) 
    @JoinColumn({ name: "fk_user_id" })
    @Column({
        default: 1
    })
    fk_user_id: User;
    
    @ManyToOne(() => Warehouse, {nullable: true})
    @JoinColumn({ name: "fk_warehouse_id" })
    fk_warehouse_id: Warehouse;

    @ManyToOne(() => WorkCenterClassification, { nullable: true })
    @JoinColumn({ name: "fk_work_center_id" })
    fk_work_center_id: WorkCenterClassification;

    @ManyToOne(() => WorkOrder, {nullable: true})
    @JoinColumn({ name: "fk_workorder_id" })
    fk_workorder_id: WorkOrder;

    @ManyToOne(() => TechnologicalUnits, { nullable: true })
    @JoinColumn({ name: "fk_technological_units_id" })
    fk_technological_units_id: TechnologicalUnits;

    @Column({
        default: null
    })
    start_date: Date; 

    @Column({
        type: "text",
        default: null
    })
    description: string; 
}