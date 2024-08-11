import path = require("path");
import { AppDataSource } from "../data-source";
import { Country } from "../entity/Country";
import { ZipCode } from "../entity/ZipCode";
import * as  fs from 'fs';
import {parse} from 'csv-parse';
import { MeasureMemoryMode } from "vm";
import { MeasurmentUnits } from "../entity/MeasurmentUnits";
import { GroupType } from "../entity/GroupType";
import { Request, Response, NextFunction } from 'express';
import { FileReader } from "../functions/FileReader";
import { CostCenters } from "../entity/CostCenters";

export class CostCentersController{
    
    public FR: FileReader = new FileReader();

    get = async (req: Request, res: Response, next: NextFunction) => {

        try {

            let list = await AppDataSource.getRepository(CostCenters)
                                          .createQueryBuilder("CC")
                                          .leftJoinAndSelect("CC.fk_user_id","User")
                                          .getMany();

            if(this.FR.checkIfArrayIsEmpty(list) == undefined) 
                    throw new Error(`Napaka: Seznam podatkov za Stroškovna mesta je trenutno prazen !`)

            return res.status(200).json(list);


        } catch(error: Error | any){
            return res.status(401).json({
                message: error.message
            });
        }

    }

    getInformation = async (req: Request, res: Response, next: NextFunction) => {

        try {

            let info = await AppDataSource.getRepository(CostCenters)
                                          .createQueryBuilder("CC")
                                          .leftJoinAndSelect('CC.fk_user_id',"User")
                                          .where({
                                            id: req.params.id
                                          })
                                          .getOne();
            
            if(this.FR.checkIfObjectIsEmpty(info) == null)
                throw new Error(`Napaka: Iskan objekt pod IDjem: ${req.params.id} ni bil najden !`)

            return res.status(200).json(info);

        } catch(error: Error | any){
            return res.status(401).json({
                message: error.message
            });
        }

    }

    upload = async (req: Request, res: Response, next: NextFunction) => {

        try {

            const filePath = path.join(process.cwd(), 'src', 'assets', 'other_data',"cost_centers.csv");
            const records = await this.FR.readFileAndParse(filePath);

            records.map(async (item: any) => {

                let CS: CostCenters = new CostCenters();
                CS.active = true; 
                CS.created_at = new Date();
                CS.title = (this.FR.checkIfItemIsValid(item.NAZIV)) ? null : this.FR.convertToSlovenian(item.NAZIV);
                CS.point = (this.FR.checkIfItemIsValid(item.TOCKA)) ? null: item.TOCKA;
                CS.status = (this.FR.checkIfItemIsValid(item.STATUS)) ? null: item.STATUS;
                CS.stm = (this.FR.checkIfItemIsValid(item.STM)) ? null: item.STM; 
                CS.type = (this.FR.checkIfItemIsValid(item.TIP)) ? null: item.TIP;
                CS.above_stm = (this.FR.checkIfItemIsValid(item.NAD_STM)) ? null: item.NAD_STM;
               
                await AppDataSource.manager.save(CS);

            });

            return res.status(200).json({
                message: "Podatki za Stroškovna mesta so bili uspešno shranjeni !"
            })

        } catch(error: Error | any){
            return res.status(401).json({
                message: error.message
            });
        }

    }


}