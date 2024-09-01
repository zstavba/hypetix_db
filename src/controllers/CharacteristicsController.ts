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
import { Classification } from "../entity/Classification";
import { Characteristics } from "../entity/Characteristics";

export class CharacteristicsController{
    
    public FR: FileReader = new FileReader();

    get = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let list = await AppDataSource.manager.getRepository(Characteristics)
                                                  .createQueryBuilder("C")
                                                  .leftJoinAndSelect("C.fk_user_id","User")
                                                  .getMany();

            return res.status(200).json(list);


        } catch (error: Error | any ) {
            return res.status(401).json({
                message: error.message
            });
        }
    }

    upload = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const filePath = path.join(process.cwd(), 'src', 'assets', 'other_data', "characteristics.csv");
            const records = await this.FR.readFileAndParse(filePath);

            records.map(async (item: any) => {
                let C: Characteristics = new Characteristics();
                C.active = true; 
                C.idg = (this.FR.checkIfItemIsValid(item.IDG)) ? null: item.IDG;
                C.title = (this.FR.checkIfItemIsValid(item.NAZIV)) ? null : this.FR.convertToSlovenian(item.NAZIV);

               await AppDataSource.manager.save(C);
            });

            return res.status(200).json({
                message: "Podatki za Karakteristike so bile uspešno naložene !"
            });

        } catch(error: Error | any) {
            return res.status(401).json({
                message: error.message
            });   
        }
    }
 

}