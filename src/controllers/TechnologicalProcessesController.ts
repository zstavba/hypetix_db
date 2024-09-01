import path = require("path");
import { AppDataSource } from "../data-source";
import * as  fs from 'fs';
import {parse} from 'csv-parse';
import { NextFunction, Request, Response } from "express";
import { FileReader } from "../functions/FileReader";
import { TechnologicalProcesses } from "../entity/TechnologicalProcesses";

export class TechnologicalProcessesController{

    public FR: FileReader = new FileReader();

    get = async (req: Request, res: Response, next: NextFunction) => {
        try {

            let list = await AppDataSource.manager.getRepository(TechnologicalProcesses)
                                                  .createQueryBuilder("TP")
                                                  .leftJoinAndSelect("TP.fk_user_id","User")
                                                  .getMany();
            
            return res.status(200).json(list);

        } catch(error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }

    upload = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const filePath = path.join(process.cwd(), 'src', 'assets', 'other_data', "kte.csv");
            const records = await this.FR.readFileAndParse(filePath);

            records.map(async (item: any) => {
                let TP: TechnologicalProcesses = new TechnologicalProcesses();
                TP.active = true;
                TP.title = (this.FR.checkIfItemIsValid(item.NAZIV)) ? null: this.FR.convertToSlovenian(item.NAZIV);
                TP.type = (this.FR.checkIfItemIsValid(item.TIP_SKUP)) ? null: item.TIP_SKUP;

                await AppDataSource.manager.save(TP);
            });


            return res.status(200).json({
                message: "Podatki za Tehnološke Procese so bili uspešno ustvarjeni !"
            })

        } catch(error : Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }

}