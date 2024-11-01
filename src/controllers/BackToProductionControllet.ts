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
import { BackToProduction } from "../entity/BackToProduction";
import { WorkCenterClassification } from "../entity/WorkCenterClassification";
import { WorkOrder } from "../entity/WorkOrder";
import { TechnologicalUnits } from "../entity/TechnologicalUnits";
import { Warehouse } from "../entity/Warehouse";
import { TrafficType } from "../entity/TrafficType";
import { MeasurmentUnits } from "../entity/MeasurmentUnits";

export class BacktoProductionController{

    public FR: FileReader = new FileReader();

    getInformation = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let findItem = await AppDataSource.manager.getRepository(BackToProduction)
                                                       .createQueryBuilder("BTP")
                                                       .leftJoinAndSelect("BTP.fk_user_id","User")
                                                       .leftJoinAndSelect("BTP.fk_warehouse_id","Warehouse")
                                                       .leftJoinAndSelect("BTP.fk_workorder_id","Workorder")
                                                       .leftJoinAndSelect("BTP.fk_technological_unit_id","TechnologicalUnits")
                                                       .leftJoinAndSelect("BTP.fk_trafic_type_id","TrafficType")
                                                       .leftJoinAndSelect("BTP.fk_mu_id","MeasurmentUnits")
                                                       .where({
                                                        id: req.params.id
                                                       })
                                                       .getOne();
                                        
            if(this.FR.checkIfObjectIsEmpty(findItem) == null)
                throw new Error(`Napaka: Za iskan ID: ${req.params.id}, ni bilo najdenih podatkov !`)

            return res.status(200).json(findItem);
            
        } catch(error: Error | any){
            return res.status(401).json({
                message: error.message
            });
        }
    }

    getProductionList = async (req: Request, res: Response, next: NextFunction) => {
        try {

            let list = await AppDataSource.manager.getRepository(BackToProduction)
                                                  .createQueryBuilder("BTP")
                                                  .leftJoinAndSelect("BTP.fk_user_id","User")
                                                  .leftJoinAndSelect("BTP.fk_warehouse_id","Warehouse")
                                                  .leftJoinAndSelect("BTP.fk_workorder_id","Workorder")
                                                  .leftJoinAndSelect("BTP.fk_technological_unit_id","TechnologicalUnits")
                                                  .leftJoinAndSelect("BTP.fk_trafic_type_id","TrafficType")
                                                  .leftJoinAndSelect("BTP.fk_mu_id","MeasurmentUnits")
                                                  .getMany();
            return res.status(200).json(list);

        } catch (error : Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }

    createProduction = async (req: Request, res: Response, next: NextFunction) => {
        try {

            let data  = req.body; 

            let production: BackToProduction = new BackToProduction();
            production.id = data.production_id; 
            production.fk_user_id = (this.FR.checkIfItemIsValid(data.fk_user_id)) ? null : data.fk_user_id as User;
            production.fk_work_center_id = (this.FR.checkIfItemIsValid(data.fk_work_center_id)) ? null: data.fk_work_center_id as WorkCenterClassification;
            production.fk_workorder_id = (this.FR.checkIfItemIsValid(data.fk_workorder_id)) ? null: data.fk_workorder_id as WorkOrder;
            production.fk_technological_unit_id = (this.FR.checkIfItemIsValid(data.fk_technological_unit_id)) ? null : data.fk_technological_unit_id as TechnologicalUnits;
            production.fk_warehouse_id = (this.FR.checkIfItemIsValid(data.fk_warehouse_id)) ? null: data.fk_warehouse_id as Warehouse;
            production.fk_trafic_type_id = (this.FR.checkIfItemIsValid(data.fk_traffic_type_id)) ? null: data.fk_traffic_type_id as TrafficType;
            production.fk_mu_id = (this.FR.checkIfItemIsValid(data.fk_mu_id)) ? null : data.fk_mu_id as MeasurmentUnits;
            production.start_date = (this.FR.checkIfItemIsValid(data.shippment_date)) ? null: data.shippment_date;
            production.weight = (this.FR.checkIfItemIsValid(data.weight)) ? null : data.weight;
    
            await AppDataSource.manager.save(production);

            // Store Items HERE

            return res.status(200).json({
                message: "Podatki za Vrnitev v proizvodnjo so bili uspešno ustvarjeni !"
            })

        } catch(error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }

}