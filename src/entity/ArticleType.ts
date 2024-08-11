import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { GroupType } from "./GroupType";

@Entity()
export class ArticleType{
    
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, {nullable: true}) 
    @JoinColumn({ name: "fk_user_id" })
    @Column({
        default: 1
    })
    fk_user_id: User;


    @ManyToOne(() => GroupType, {nullable: true})
    @JoinColumn({ name: "fk_group_type" })
    fk_group_type: GroupType

    @Column({
        type: "text",
        default: null
    })
    title: string;

    @Column({
        type: "text",
        default: null
    })
    code: string;

    @Column({
        type: "text",
        default: null
    })
    type: string;

    @Column({
        type: "text",
        default: null
    })
    group_name: string;

    @Column({
        type: "text",
        default: null
    })
    konto: string;

    @Column({
        type: "text",
        default: null
    })
    konto_consignation: string;


    @Column({
        type: "boolean",
        default: null
    })
    active: string;


    @Column({
        default: null
    })
    created_at: Date;

}