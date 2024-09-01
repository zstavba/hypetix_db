import { BeforeInsert, Column, Entity, Generated, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { WorkOrder } from "./WorkOrder";
import { Traitor } from "./Traitor";
import { TraitorItem } from "./TraitorItem";
import { WarehouseSlip } from "./WarehouseSlip";

@Entity()
export class WarehouseFabricSaved{
    
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Traitor, {nullable: true})
    @JoinColumn({ name: "fk_traitor_id" })
    fk_traitor_id: Traitor;

    @ManyToOne(() => TraitorItem, {nullable: true})
    @JoinColumn({ name: "fk_traitor_item_id" })
    fk_traitor_item_id: TraitorItem;

    @Column({
        default: null
    })
    used_ammount: string; 

    @Column({
        type: "boolean",
        default: 0
    })
    saved: boolean;



}