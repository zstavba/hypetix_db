import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { MeasurmentUnits } from "./MeasurmentUnits";
import { ArticleType } from "./ArticleType";
import { Coder } from "./Coder";

@Entity()
export class CoderInformation{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Coder, {nullable: true})
    @JoinColumn({ name: "fk_coder_id" })
    fk_coder_id: Coder;

}