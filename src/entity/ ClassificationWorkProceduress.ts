import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { MeasurmentUnits } from "./MeasurmentUnits";
import { ArticleType } from "./ArticleType";
import { Warehouse } from "./Warehouse";
import { CustomTariffs } from "./CustomTariffs";
import { Country } from "./Country";
import { Classification } from "./Classification";

@Entity()
export class  ClassificationWorkProceduress{
    
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, {nullable: true}) 
    @JoinColumn({ name: "fk_user_id" })
    @Column({
        default: 1
    })
    fk_user_id: User;


    @Column({
        default:null
    })
    type: string; 

    @Column({
        default:null
    })
    title: string; 

    @Column({
        type: "boolean",
        default:0
    })
    active: boolean;


}