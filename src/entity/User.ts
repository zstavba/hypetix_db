import { Column, Entity, JoinColumn, ManyToOne, ObjectIdColumn, PrimaryGeneratedColumn } from "typeorm";
import { Country } from "./Country";
import { ZipCode } from "./ZipCode";

export enum UserType {
    admin =  "admin",
    partner = "partner",
    worker = "worker",
    guest =  "guest",
    spenders = "spenders",
    suppliers = 'suppliers',
    manufacturer = 'manufacturer',
    buyers = "buyers",
    passengers = "passengers"
};


@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Country, {nullable: true })
    @JoinColumn({ name: "fk_country_id" })
    fk_country_id: Country;

    @ManyToOne(() => ZipCode, {nullable: true})
    @JoinColumn({ name: "fk_zipcode_id" })
    fk_zipcode_id: ZipCode

    @Column({
        default: null
    })
    first_name: string;

    @Column({
        default: null
    })
    last_name: string; 

    @Column({
        default: null
    })
    username: string;

    @Column({
        default: null
    })
    password: string;

    @Column({
        default: null
    })
    email: string;

    @Column({
        type: "text",
        default: null
    })

    profile_image: string; 
 
    @Column({
        type: "enum",
        enum: UserType,
        default: UserType.guest
    })
    user_type: string;


    @Column({
        type: "text",
        default: null
    })

    sex: string; 

    @Column({
        default: null
    })
    address: string;

    @Column({
        default: null
    })
    phone_number: string;

    @Column({
        type: "text",
        default: null
    })
    tax_number: string; 

    @Column({
        type: "text",
        default: null
    })
    emsho: string; 

    @Column({
        type: "date"
    })
    updated_at: Date;

    @Column({
        type: "date"
    })
    created_at: Date; 
}