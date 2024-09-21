import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { AltrernativeChippers } from "./AlternativeChippers";
import { Warehouse } from "./Warehouse";
import { MeasurmentUnits } from "./MeasurmentUnits";
import { MaterialSheet } from "./MaterialSheet";

@Entity()
export class MaterialSheetItem{
    
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => AltrernativeChippers, {nullable: true})
    @JoinColumn({ name: "fk_alternative_chiper_id" })
    fk_alternative_chiper_id: AltrernativeChippers;

    @ManyToOne(() => Warehouse, { nullable: true })
    @JoinColumn({ name: "fk_warehouse_id" })
    fk_warehouse_id: Warehouse; 

    @ManyToOne(() => MeasurmentUnits, {nullable: true})
    @JoinColumn({ name: "fk_mu_id" })
    fk_mu_id: MeasurmentUnits;

    @ManyToOne(() => MaterialSheet, {nullable: true})
    @JoinColumn({ name: "fk_material_sheet_id" })
    fk_material_sheet_id:MaterialSheet;

    @Column({
        default: null
    })
    ammount: string; 

    @Column({
        default: null
    })
    usage: string; 

    @Column({
        default: null
    })
    deadline: Date; 


}