import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Country } from "./Country";
import { ZipCode } from "./ZipCode";
import { User } from "./User";

@Entity()
export class ShoppingPlaces{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, {nullable: true})
    @JoinColumn({ name: "fk_user_id" })
    @Column({
        default: 1
    })
    fk_user_id: User;

    @ManyToOne(() => Country, {nullable: true})
    @JoinColumn({ name: "fk_country_id" })
    fk_country_id: Country;

    @ManyToOne(() => ZipCode, { nullable: true })
    @JoinColumn({ name: "fk_zip_code_id" })
    fk_zip_code_id: ZipCode

    @Column({
        default: null
    })
    company_name: string;

    @Column({
        default: null
    })
    phone_number: string;


    @Column({
        default: null
    })
    company_addres: string;


    
}