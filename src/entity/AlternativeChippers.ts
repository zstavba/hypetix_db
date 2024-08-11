import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { MeasurmentUnits } from "./MeasurmentUnits";
import { ArticleType } from "./ArticleType";
import { Warehouse } from "./Warehouse";
import { CustomTariffs } from "./CustomTariffs";
import { Country } from "./Country";
import { Classification } from "./Classification";

@Entity()
export class AltrernativeChippers{
    
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, {nullable: true}) 
    @JoinColumn({ name: "fk_user_id" })
    @Column({
        default: 1
    })
    fk_user_id: User;

    @ManyToOne(() => MeasurmentUnits, {nullable: true})
    @JoinColumn({ name: "fk_mu_id" })
    fk_mu_id: MeasurmentUnits;

    @ManyToOne(() => ArticleType, {nullable: true})
    @JoinColumn({ name: "fk_article_type_id" })
    fk_article_type_id: ArticleType;

    @ManyToOne(() => Warehouse, {nullable: true})
    @JoinColumn({ name: "fk_warehouse_id" })
    fk_warehouse_id: Warehouse;

    @ManyToOne(() => CustomTariffs, {nullable: true})
    @JoinColumn({ name: "fk_custom_tarifs_id" })
    fk_custom_tarifs_id: CustomTariffs;
    
    @ManyToOne(() =>  Country, {nullable: true})
    @JoinColumn({ name: "fk_country_id" })
    fk_country_id: Country;

    @ManyToOne(() =>  Classification, { nullable : true })
    @JoinColumn({ name: "fk_classification_id" })
    fk_classification_id: Classification;

    @Column({
        type: "text",
        default: null
    })
    title: string; 

    @Column({
        type: "text",
        default: null
    })
    ident: string; 


    @Column({
        type: "boolean",
        default: 0
    })
    active: boolean; 

    @Column({
        type: "boolean",
        default: 0
    })
    intrasant: boolean;

    @Column({
        type: "boolean",
        default: 0
    })
    visibillity: boolean;
    
    @Column({
        type: "text",
        default: null
    })
    standart: string;

    @Column({
        type: "text",
        default: null
    })
    belonging: string; 

    @Column({
        type: "boolean",
        default: 0
    })
    traceability: boolean;

    @Column({
        type: "text",
        default: null
    })
    length: string;

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
    volume: string;



    @Column({
        default: null
    })
    delivery_time: Date; 


    @Column({
        default: null
    })
    creation_time: Date; 
}