import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { MeasurmentUnits } from "./MeasurmentUnits";
import { ArticleType } from "./ArticleType";
import { Warehouse } from "./Warehouse";
import { CustomTariffs } from "./CustomTariffs";
import { Country } from "./Country";
import { Tax } from "./Tax";
import { GroupType } from "./GroupType";

@Entity()
export class AltrernativeChippersMarketing{

        
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, {nullable: true}) 
    @JoinColumn({ name: "fk_user_id" })
    fk_user_id: User;

    @ManyToOne(() => User, {  nullable: true })
    @JoinColumn({ name: "fk_supplier_id" })
    fk_supplier_id: User

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: "fk_manufactrer_id" })
    fk_manufactrer_id: User; 

    @ManyToOne(() => Country, { nullable: true })
    @JoinColumn({ name : "fk_country_id" })
    fk_country_id: Country;

    @ManyToOne(() => Warehouse, { nullable: true })
    @JoinColumn({ name: "fk_warehouse_id" })
    fk_warehouse_id: Warehouse
    
    @ManyToOne(() => MeasurmentUnits, { nullable: true })
    @JoinColumn({ name: "fk_mu_id" })
    fk_mu_id: MeasurmentUnits

    @ManyToOne(() => Tax, { nullable: true })
    @JoinColumn({ name: "fk_tax_id" })
    fk_tax_id: Tax;

    @ManyToOne(() => GroupType, { nullable: true })
    @JoinColumn({ name: "fk_group_type_1_id" })
    fk_group_type_1_id: GroupType;

    @ManyToOne(() => GroupType, { nullable: true })
    @JoinColumn({ name: "fk_group_type_2_id" })
    fk_group_type_2_id: GroupType;

    @ManyToOne(() => GroupType, { nullable: true })
    @JoinColumn({ name: "fk_group_type_3_id" })
    fk_group_type_3_id: GroupType;

    @ManyToOne(() => GroupType, { nullable: true })
    @JoinColumn({ name: "fk_group_type_4_id" })
    fk_group_type_4_id: GroupType;

    @ManyToMany(() => User, { nullable: true })
    @JoinTable({ name: "alternative_chipers_marketing_partners" })
    alternative_chipers_marketing_partners: User[]

    @ManyToMany(() => Warehouse, {nullable: true})
    @JoinTable({ name: "alternative_chipers_marketing_warehouses" })
    alternative_chipers_marketing_warehouses: Warehouse[];

    @Column({
        type: "text",
        default: null
    })
    supplier_code: string; 

    @Column({
        type: "text",
        default: null
    })
    ean: string; 

    @Column({
        type: "text",
        default: null
    })
    description: string; 

    @Column({
        type: "text",
        default: null
    })
    supplier_article_name: string; 

    @Column({
        type: "text",
        default: null
    })
    article_color: string; 

    @Column({
        type: "text",
        default: null
    })
    kala: string; 



}