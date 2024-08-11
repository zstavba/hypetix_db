import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { MeasurmentUnits } from "./MeasurmentUnits";
import { ArticleType } from "./ArticleType";

@Entity()
export class Coder{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, {nullable: true})
    @JoinColumn({ name: "fk_user_id" })
    fk_user_id: User;

    @ManyToOne(() => MeasurmentUnits, {nullable: true})
    @JoinColumn({ name: "fk_em_id" })
    fk_em_id: MeasurmentUnits;

    @ManyToOne(() => ArticleType, {nullable: true})
    @JoinColumn({ name: "fk_article_type_id" })
    fk_article_type_id: ArticleType;

    @Column({
        type: "text",
        default: null
    })
    ident: string; 

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
    description: string; 

    @Column({
        type: "text",
        default: null
    })
    Type: string; 

}