import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class GroupType{
    
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, {nullable: true}) 
    @JoinColumn({ name: "fk_user_id" })
    @Column({
        default: 1
    })
    fk_user_id: User;

    @Column({
        type: "text",
        collation: "utf8_slovenian_ci",
        default: null
    })
    type: string;

    @Column({
        type: "text",
        collation: "utf8_slovenian_ci",
        default: null  
    })
    title: string; 

    @Column({
        type: "boolean",
        collation: "utf8_slovenian_ci",
        default: null  
    })
    active: boolean;

    @Column({
        type: "text",
        collation: "utf8_slovenian_ci",
        default: null  
    })
    status: string; 

    @Column({
        type: "text",
        collation: "utf8_slovenian_ci",
        default: null  
    })
    idg: string

    @Column({
        type: "date",
        collation: "utf8_slovenian_ci",
        default: null  
    })
    created_at: Date
    

}