import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { UnitAboveStorage } from "./UnitAboveStorage";

enum PriorityType {
    zero = "undefined",
    one = "highest"
}

@Entity()
export class Locations{
    
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, {nullable: true}) 
    @JoinColumn({ name: "fk_user_id" })
    @Column({
        default: 1
    })
    fk_user_id: User;

    @ManyToOne(() => UnitAboveStorage, {nullable: true})
    @JoinColumn({name: "fk_uas_id"})
    fk_uas_id: UnitAboveStorage

    @ManyToOne(() => User, {nullable: true})
    @JoinColumn({ name: "fk_partner_id" })
    fk_partner_id: User;


    @Column({
        type: "text",
        default: null
    })
    location_id: string; 

    @Column({
        type: "text",
        default: null
    })
    warehouse_id: string; 

    @Column({
        type: "text",
        default: null
    })
    title: string;

    @Column({
        type: "enum",
        enum: PriorityType,
        default: PriorityType.zero
    })
    priority: PriorityType;


    @Column({
        type: "text",
        default: null
    })
    length: string;
    
    @Column({
        type: "text",
        default: null
    })
    volume: string; 

    @Column({
        type: "text",
        default: null
    })
    width: string; 

    @Column({
        type: "text",
        default: null
    })
    height: string; 

    @Column({
        type: "text",
        default: null
    })
    max_weight: string; 

    @Column({
        type: "text",
        default: null
    })
    extra_1: string; 

    @Column({
        type: "text",
        default: null
    })
    extra_2: string; 

    @Column({
        type: "text",
        default: null
    })
    extra_3: string; 

    @Column({
        type: "boolean",
        default:0
    })
    pickup_location: boolean; 

    @Column({
        type: "boolean",
        default:0
    })
    shipping_location: boolean; 

    @Column({
        type: "boolean",
        default:0
    })
    auxiliary_location: boolean; 

    @Column({
        type: "boolean",
        default:0
    })
    refound_location: boolean; 

    @Column({
        type: "boolean",
        default:0
    })
    active: boolean; 

    @Column({
        default: null
    })
    updated_at: Date;

    @Column({
        default: null
    })
    created_at: Date;


}