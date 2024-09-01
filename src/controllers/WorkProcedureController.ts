import path = require("path");
import { AppDataSource } from "../data-source";
import { Country } from "../entity/Country";
import { GroupType } from "../entity/GroupType";
import { ZipCode } from "../entity/ZipCode";
import * as  fs from 'fs';
import {parse} from 'csv-parse';
import { NextFunction, Request, Response } from "express";
import { MeasurmentUnits } from "../entity/MeasurmentUnits";
import { Tax } from "../entity/Tax";
import { Warehouse } from "../entity/Warehouse";
import { FileReader } from "../functions/FileReader";
import { WorkProcedures } from "../entity/WorkProcedures";
import { Classification } from "../entity/Classification";

export class WorkProcedureController{

    public FR: FileReader = new FileReader();

    get = async (req: Request, res: Response, next: NextFunction) => {
        try {

            let list  =  await AppDataSource.manager.getRepository(WorkProcedures)
                                                    .createQueryBuilder("WP")
                                                    .leftJoinAndSelect("WP.fk_user_id","User")
                                                    .leftJoinAndSelect("WP.fk_em_id","MeassurmentUnits")
                                                    .leftJoinAndSelect("WP.fk_classification_id","Classification")
                                                    .getMany();

            if(this.FR.checkIfArrayIsEmpty(list) == undefined)
                throw new Error(`Napaka: Iskan seznam je trenutno prazen !`);

            return res.status(200).json(list);

        } catch (error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }

    getInformation = async (req: Request, res: Response, next: NextFunction) => {
        try {

            let info = await AppDataSource.manager.getTreeRepository(WorkProcedures)
                                                  .createQueryBuilder("WP")
                                                  .leftJoinAndSelect("WP.fk_user_id","User")
                                                  .leftJoinAndSelect("WP.fk_em_id","MeassurmentUnits")
                                                  .leftJoinAndSelect("WP.fk_classification_id","Classification")
                                                  .where({
                                                    id: req.params.id
                                                  })
                                                  .getOne();
            
            if(this.FR.checkIfObjectIsEmpty(info) == null)
                throw new Error(`Napaka: Za iskan ID: ${req.params.id} ni bilo najdenih doebnih podatkov !`)

            
            return res.status(200).json(info);

        } catch (error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }
    
    upload = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const filePath = path.join(process.cwd(), 'src', 'assets', 'other_data',"dp.csv");
            const records = await this.FR.readFileAndParse(filePath);

            records.map(async (item: any)  => {
                let WP: WorkProcedures = new WorkProcedures();
                WP.title = (this.FR.checkIfItemIsValid(item.NAZIV)) ? null :  this.FR.convertToSlovenian(item.NAZIV);
                WP.type = (this.FR.checkIfItemIsValid(item.TIP_DP)) ? null : item.TIP_DP;
                let getEM = await AppDataSource.manager.getRepository(MeasurmentUnits)
                                                       .createQueryBuilder("EM")
                                                       .where({
                                                        idg: item.EM
                                                       })
                                                       .getOne();
                
                WP.fk_em_id = (this.FR.checkIfObjectIsEmpty(getEM) == null) ? null : getEM;

                let getClassification = await AppDataSource.manager.getRepository(Classification)
                                                                   .createQueryBuilder("C")
                                                                   .where({
                                                                    id: item.KLASIF
                                                                   })
                                                                   .getOne();
                WP.fk_classification_id = (this.FR.checkIfObjectIsEmpty(getClassification) == null) ? null : getClassification;
                
                await AppDataSource.manager.save(WP);

            });


            return res.status(200).json({
                message: "POdatki za delovne postopke so bili uspešno ustvarjeni !"
            })

        } catch (error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }


    deletereWorkProcedure = async (req: Request, res: Response, next: NextFunction ) => {
        try {

            let deleteItem = await AppDataSource.manager.getRepository(WorkProcedures)
                                                        .createQueryBuilder("WP")
                                                        .delete()
                                                        .from(WorkProcedures)
                                                        .where({
                                                            id: req.params.id
                                                        })
                                                        .execute();

            return res.status(200).json({
                message: `Podatki za izbran ID: ${req.params.id} so bili uspešno izbrisani !`
            })

        } catch(error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }

}