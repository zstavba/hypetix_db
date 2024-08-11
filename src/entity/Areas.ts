import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { GroupType } from "./GroupType";

@Entity()
export class Areas{
    
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
        default: null
    })
    area: string; 

    @Column({
        type: "text",
        default: null
    })
    description: string; 

    @Column({
        type: "text",
        default: null
    })
    superiors: string; 

    @Column({
        type: "text",
        default: null
    })
    municipality: string; 

    @Column({
        type: "boolean",
        default: null
    })
    active: boolean; 

    @Column({
        default: null
    })
    created_at: Date;
    
    

}
