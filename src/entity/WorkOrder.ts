import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Warehouse } from "./Warehouse";
import { AltrernativeChippers } from "./AlternativeChippers";

@Entity()
export class WorkOrder{

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

    @ManyToOne(() => User, {nullable: true})
    @JoinColumn({ name: "fk_partner_id" })
    fk_partner_id: User;

    @ManyToOne(() => AltrernativeChippers, {nullable: true})
    @JoinColumn({ name: "fk_alternative_chiper_id" })
    fk_alternative_chiper_id: AltrernativeChippers;

    @Column({
        default: null
    })
    start_date: Date; 

    @Column({
        default: null
    })
    shipent_date: Date; 

    @Column({
        default: null
    })
    article_length: string; 
    
    @Column({
        default: null
    })
    article_ammount: string; 

    @Column({
        default: null
    })
    article_width: string; 

    @Column({
        default: null
    })
    article_square_meters: string;

    @Column({
        default: null
    })
    article_description: string; 


    

}