import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { GroupType } from "./GroupType";
import { Warehouse } from "./Warehouse";
import { WorkOrder } from "./WorkOrder";
import { TechnologicalUnits } from "./TechnologicalUnits";
import { TrafficType } from "./TrafficType";
import { MeasurmentUnits } from "./MeasurmentUnits";
import { AltrernativeChippers } from "./AlternativeChippers";
import { ArticleType } from "./ArticleType";

@Entity()
export class BackToProductionItem{
    
        
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => AltrernativeChippers, { nullable: true })
    @JoinColumn({ name: "fk_alternative_chipper_id" })
    fk_alternative_chipper_id: AltrernativeChippers;
    

    @ManyToOne(() => WorkOrder, { nullable: true })
    @JoinColumn({ name: "fk_workorder_id" })
    fk_workorder_id: WorkOrder;

    @ManyToOne(() => Warehouse, { nullable: true })
    @JoinColumn({ name: "fk_warehouse_id" })
    fk_warehouse_id: Warehouse;

    @ManyToOne(() => MeasurmentUnits, { nullable: true })
    @JoinColumn({ name: "fk_mu_id" })
    fk_mu_id: MeasurmentUnits;

    @ManyToOne(() => ArticleType, { nullable: true })
    @JoinColumn({ name: "fk_article_type_id" })
    fk_article_type_id: ArticleType;

    @Column({
        default: null
    })
    ammount: string; 

    @Column({
        default: null
    })
    open: string; 

    @Column({
        default: null
    })
    closed: string; 

    @Column({
        default: null
    })
    shippment_date: Date;  

    @Column({
        default: null
    })
    konto: string; 

    @Column({
        default: null
    })
    weight: string; 



}