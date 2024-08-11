import path = require("path");
import { AppDataSource } from "../data-source";
import { Country } from "../entity/Country";
import { GroupType } from "../entity/GroupType";
import { ZipCode } from "../entity/ZipCode";
import * as  fs from 'fs';
import {parse} from 'csv-parse';
import { NextFunction, Request, Response } from "express";
import { ArticleType } from "../entity/ArticleType";
import { FileReader } from "../functions/FileReader";
import { User } from "../entity/User";
import { Areas } from "../entity/Areas";
import { AltrernativeChippersMarketing } from "../entity/AlternativeChippersMarketing";
import { Warehouse } from "../entity/Warehouse";
import { Tax } from "../entity/Tax";
import { MeasurmentUnits } from "../entity/MeasurmentUnits";
import { AltrernativeChippers } from "../entity/AlternativeChippers";
import { CustomTariffs } from "../entity/CustomTariffs";
import { Classification } from "../entity/Classification";

export class AlternativeChipersController{

    private FR: FileReader = new FileReader();

    createMakretingChiper = async ( req: Request, res: Response, next: NextFunction ) => {
        try {
            let data = req.body;
            let marketing: AltrernativeChippersMarketing = new AltrernativeChippersMarketing();
            marketing.id = (this.FR.checkIfItemIsValid(data.chipers_code)) ? null :  data.chipers_code;
            marketing.supplier_article_name =  (this.FR.checkIfItemIsValid(data.chipers_supplier_article_name)) ? null :  data.chipers_supplier_article_name;
            marketing.article_color = (this.FR.checkIfItemIsValid(data.chipers_color)) ? null :  data.chipers_color;
            marketing.kala =  (this.FR.checkIfItemIsValid(data.chipers_kala)) ? null:  data.chipers_kala;
            marketing.description = (this.FR.checkIfItemIsValid(data.chipers_description)) ? null :  data.chipers_description;
            marketing.alternative_chipers_marketing_partners =  (this.FR.checkIfObjectIsEmpty(data.chipers_parnters) == null) ? null : data.chipers_parnters as User[];
            marketing.alternative_chipers_marketing_warehouses = (this.FR.checkIfObjectIsEmpty(data.chipers_warehouses) == null) ? null :  data.chipers_warehouses as Warehouse[];
            marketing.fk_supplier_id = (this.FR.checkIfObjectIsEmpty(data.chipers_suplier) == null) ? null : data.chipers_suplier as User; 
            marketing.fk_country_id =  (this.FR.checkIfObjectIsEmpty(data.chipers_country) == null) ? null :  data.chipers_country as Country;
            marketing.fk_warehouse_id = (this.FR.checkIfObjectIsEmpty(data.chipers_warehouse) == null) ? null : data.chipers_warehouse as Warehouse;
            marketing.fk_tax_id =  (this.FR.checkIfObjectIsEmpty(data.chipers_tax) == null) ? null :  data.chipers_tax as Tax;
            marketing.fk_group_type_1_id =  (this.FR.checkIfObjectIsEmpty(data.chipers_group_1) == null) ? null : data.chipers_group_1 as GroupType;
            marketing.fk_group_type_2_id = (this.FR.checkIfObjectIsEmpty(data.chipers_group_2) == null) ? null : data.chipers_group_2 as GroupType;
            marketing.fk_group_type_3_id = (this.FR.checkIfObjectIsEmpty(data.chipers_group_3) == null) ? null  : data.chipers_group_3 as GroupType;
            marketing.fk_group_type_4_id = (this.FR.checkIfObjectIsEmpty(data.chipers_group_4) == null) ? null  :data.chipers_group_4 as GroupType;
            marketing.fk_mu_id =  (this.FR.checkIfObjectIsEmpty(data.chipers_meassurment_unit) == null) ? null : data.chipers_meassurment_unit as MeasurmentUnits;

            await AppDataSource.manager.save(marketing);

            return res.status(200).json({
                message: "Podatki za alternativne šifre za marekting so bili uspešno ustvarjeni !"
            })

        } catch(error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }

    createDefaultInformation = async(req: Request, res: Response, next: NextFunction) => {
        try {
            let data = req.body;

            let info : AltrernativeChippers =  new AltrernativeChippers();
            info.id = data.chipers_code; 
            info.title = data.chepers_title; 
            info.fk_custom_tarifs_id = (this.FR.checkIfObjectIsEmpty(data.chipers_custom_tarifs) == null) ? null: data.chipers_custom_tarifs as CustomTariffs;
            info.active = data.chipers_active;
            info.intrasant = data.chipers_intrasant;
            info.fk_mu_id = (this.FR.checkIfObjectIsEmpty(data.chipers_meassurment_unit) == null) ? null: data.chipers_meassurment_unit  as MeasurmentUnits;
            info.fk_article_type_id = (this.FR.checkIfObjectIsEmpty(data.chipers_article_type) == null) ? null :  data.chipers_article_type as ArticleType;
            info.fk_classification_id = (this.FR.checkIfObjectIsEmpty(data.chipers_classification) == null) ? null : data.chipers_classification as Classification;
            info.fk_warehouse_id = (this.FR.checkIfObjectIsEmpty(data.chipers_warehouses) == null) ?  null : data.chipers_warehouses as Warehouse;
            info.standart = (this.FR.checkIfItemIsValid(data.chipers_standart)) ? null : data.chipers_standart;
            info.belonging = (this.FR.checkIfItemIsValid(data.chipers_belonging)) ? null: data.chipers_belonging;
            info.delivery_time = (this.FR.checkIfItemIsValid(data.chipers_delivery_time)) ? null : data.chipers_delivery_time;
            info.creation_time = (this.FR.checkIfItemIsValid(data.chipers_creation_time)) ? null : data.chipers_creation_time;
            info.width = (this.FR.checkIfItemIsValid(data.chipers_width)) ? null: data.chipers_width;
            info.length = (this.FR.checkIfItemIsValid(data.chipers_length)) ? null: data.chipers_length;
            info.height = (this.FR.checkIfItemIsValid(data.chipers_height)) ? null : data.chipers_height;
            info.volume = (this.FR.checkIfItemIsValid(data.chipers_volume)) ? null: data.chipers_volume;
            
            await AppDataSource.manager.save(info);

            return res.status(200).json({
                message: "Podatki za razvoj so bili uspešno shranjeni !"
            })

        } catch(error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }
 
    getMarketingInformation = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let info = await AppDataSource.getRepository(AltrernativeChippersMarketing)
                                          
            if(this.FR.checkIfObjectIsEmpty(info) == null)                              
                throw new Error(`Napaka: Iskan objekt pod IDJem: ${req.params.id} ni bil najden ali pa ne obstaja !`)

            return res.status(200).json(info);

        } catch(error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }

    getList = async (req: Request, res: Response, next: NextFunction) => {
        try {
        
            let list = await AppDataSource.getRepository(AltrernativeChippers)
                                          .createQueryBuilder("AC")
                                          .leftJoinAndSelect("AC.fk_user_id","User")
                                          .getMany();

            return res.status(200).json(list);  


        } catch (error: Error | any ) {
            return res.status(401).json({
                message: error.message
            });

        }

    }


}