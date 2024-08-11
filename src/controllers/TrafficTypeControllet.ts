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
import { FileReader } from "../functions/FileReader";
import { TrafficType } from "../entity/TrafficType";

export class TrafficTypeController{

    public FR: FileReader = new FileReader();

    get = async (req: Request, res: Response, next: NextFunction) => {
        try {

            let list = await AppDataSource.getRepository(TrafficType)
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

    getInformation = async (req: Request, res: Response, next: NextFunction) => {
        try {

        } catch(error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }
    


    upload = async (req: Request, res: Response, next: NextFunction) => {
        try {

            let file = req.file;
            const filePath = path.join(process.cwd(), 'src', 'assets', 'upload', file.filename);
            const records = await this.FR.readFileAndParse(filePath);

            records.map(async (item: any) => {
                let TP: TrafficType = new TrafficType();
                TP.active = true;
                TP.created_at = new Date();
                TP.description = (item.OPIS == undefined || item.OPIS == null || item.OPIS == '') ? null: this.FR.convertToSlovenian(item.OPIS);
                TP.attribute = (item.ATRIBUT == undefined || item.ATRIBUT == null || item.ATRIBUT == '') ? null : item.ATRIBUT;
                TP.status = (item.STATUS == undefined || item.STATUS == null || item.STATUS == '') ? null : item.STATUS;
 
               await AppDataSource.manager.save(TP);

            });
            return res.status(200).json({
                message: "Podatki za Vrste Prometa so bili uspešno uvoženi."
            })

        } catch (error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }

    }

}