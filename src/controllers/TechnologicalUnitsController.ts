import path = require("path");
import { AppDataSource } from "../data-source";
import * as  fs from 'fs';
import {parse} from 'csv-parse';
import { NextFunction, Request, Response } from "express";
import { FileReader } from "../functions/FileReader";
import { TechnologicalProcesses } from "../entity/TechnologicalProcesses";
import { TechnologicalUnits } from "../entity/TechnologicalUnits";
import { Classification } from "../entity/Classification";

export class TechnologicalUnitsController{

    public FR: FileReader = new FileReader();

    get = async (req: Request, res: Response, next: NextFunction) => {
        try {

            let list = await AppDataSource.manager.getRepository(TechnologicalUnits)
                                                  .createQueryBuilder("TP")
                                                  .leftJoinAndSelect("TP.fk_user_id","User")
                                                  .leftJoinAndSelect("TP.fk_classification_id","Classification")
                                                  .getMany();

            return res.status(200).json(list);

        } catch (error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }

    getInformation = async (req: Request, res: Response, next: NextFunction) => {
        try {

            let info = await AppDataSource.manager.getRepository(TechnologicalUnits)
                                                  .createQueryBuilder("TP")
                                                  .leftJoinAndSelect("TP.fk_user_id","User")
                                                  .leftJoinAndSelect("TP.fk_classification_id","Classification")
                                                  .where({
                                                    id: req.params.id
                                                  })
                                                  .getOne();
            
            if(this.FR.checkIfObjectIsEmpty(info) == null)
                throw new Error(`Napaka: Za iskan ID: ${req.params.id} ni mogoče prikazati podatkov !`)

            return res.status(200).json(info);

        } catch(error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }


    upload = async (req: Request, res: Response, next: NextFunction) => {
        try {

            const filePath = path.join(process.cwd(), 'src', 'assets', 'other_data', "tp.csv");
            const records = await this.FR.readFileAndParse(filePath);


            records.map(async (item: any) => {
                let TU: TechnologicalUnits = new TechnologicalUnits();
                TU.active = true; 
                let getClassification = await AppDataSource.manager.getRepository(Classification)
                                                                   .createQueryBuilder("C")
                                                                   .leftJoinAndSelect("C.fk_user_id","User")
                                                                   .where({
                                                                        id: item.KLASIF
                                                                   })
                                                                   .getOne();
                TU.fk_classification_id = (this.FR.checkIfObjectIsEmpty(getClassification) == null) ? null : getClassification;
                TU.title = (this.FR.checkIfItemIsValid(item.NAZIV)) ? null : this.FR.convertToSlovenian(item.NAZIV);

               await AppDataSource.manager.save(TU);
 
            });


            return res.status(200).json({
                message: "Podatki za tehnološke enote so bili uspešno naloženi !"
            });

        } catch (error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }

}