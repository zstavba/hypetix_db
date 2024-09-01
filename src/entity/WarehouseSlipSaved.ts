import { BeforeInsert, Column, Entity, Generated, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { WorkOrder } from "./WorkOrder";
import { Traitor } from "./Traitor";
import { TraitorItem } from "./TraitorItem";
import { WarehouseSlip } from "./WarehouseSlip";

@Entity()
export class WarehouseSlipSaved{
    
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Traitor, {nullable: true})
    @JoinColumn({ name: "fk_traitor_id" })
    fk_traitor_id: Traitor;

    @ManyToOne(() => WarehouseSlip, {nullable: true})
    @JoinColumn({ name: "fk_warehouse_slip_id" })
    fk_warehouse_slip_id: WarehouseSlip;

    @Column({
        type: "boolean",
        default: 0
    })
    saved: boolean;



}