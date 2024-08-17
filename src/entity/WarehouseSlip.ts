import { BeforeInsert, Column, Entity, Generated, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { WorkOrder } from "./WorkOrder";

@Entity()
export class WarehouseSlip{
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        default: null
    })
    sequence_number: number;
    
    @Column({
        default: null
    })
    sequence_number_workorder: number;

        
    @Column({
        default: null
    })
    workorder_id: string;

    @ManyToOne(() => User, {nullable: true}) 
    @JoinColumn({ name: "fk_user_id" })
    @Column({
        default: 1
    })
    fk_user_id: User;

    @ManyToOne(() => WorkOrder, {nullable :  true})
    @JoinColumn({ name: "fk_workorder_id" })
    fk_workorder_id: WorkOrder;

    @Column({
        default: null
    })
    item_width: string;

    @Column({
        default: null
    })
    item_length: string; 

    @Column({
        default: null
    })
    item_weight: string; 

    @Column({
        type: 'json',
        default: null
    })
    item_gramature: string[];

    @Column({
        default: null
    })
    item_gramature_average: string;

    @Column({
        default: null
    })
    item_ammount_meters: string; 

    @Column({
        type: 'json',
        default: null
    })
    item_thicness: string[];

    @Column({
        default: null
    })
    item_thicness_average: string; 
    
    @Column({
        type: 'json',
        default: null
    })
    item_permeability: string[]

    @Column({
        default: null
    })
    item_permeability_average: string; 


}