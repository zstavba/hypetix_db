import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { MeasurmentUnits } from "./MeasurmentUnits";
import { Classification } from "./Classification";
import { WorkSheet } from "./WorkSheet";
import { AltrernativeChippers } from "./AlternativeChippers";
import { AlternativeChipersController } from "../controllers/AlternativeChipersController";
import { ArticleType } from "./ArticleType";

@Entity()
export class WorkSheetItem{

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, {nullable: true}) 
    @JoinColumn({ name: "fk_user_id" })
    @Column({
        default: 1
    })
    fk_user_id: User;

    @ManyToOne(() => WorkSheet, {nullable: true})
    @JoinColumn({ name: "fk_work_sheet_id" })
    fk_work_sheet_id: WorkSheet;

    @ManyToOne(() => AltrernativeChippers, { nullable: true})
    @JoinColumn({ name: "fk_alternative_chiper_id" })
    fk_alternative_chiper_id: AltrernativeChippers;

    @ManyToOne(() => MeasurmentUnits, { nullable: true })
    @JoinColumn({ name: "fk_mu_id" })
    fk_mu_id: MeasurmentUnits;

    @ManyToOne(() => ArticleType, { nullable: true })
    @JoinColumn({ name: "fk_article_type_id" })
    fk_article_type_id: ArticleType

    @Column({
        default: null
    })
    ammount: string; 




}