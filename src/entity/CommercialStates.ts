import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

enum CommercialStatesTypes {
    BK = "debit_notes",
    OK = "credits",
    FK = "fakturing",
    FT = "fakturing_country",
    ND = "suppliers_orders",
    NK = "costumer_orders",
    PO = "offers",
    PR = "estimates",
    XX = "general_statments"
}


@Entity()
export class CommercialStates{
    
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, {nullable: true}) 
    @JoinColumn({ name: "fk_user_id" })
    @Column({
        default: 1
    })
    fk_user_id: User;

    @Column({
        type: "enum",
        enum: CommercialStatesTypes
    })
    type: CommercialStatesTypes; 

    @Column({
        type: "text",
        default: null
    })
    title: string;


    @Column({
        type: "text",
        default: null
    })
    description: string;


    @Column({
        type: "text",
        default: null
    })
    status: string; 


    @Column({
        type: "boolean",
        default: 0
    })
    active: boolean; 
    
    @Column({
        default: null
    })

    created_at: Date;


}