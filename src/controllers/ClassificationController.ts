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

export class ClassificationController{
    
    public FR: FileReader = new FileReader();

    get = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let list = await AppDataSource.getRepository(Classification)
                                          .createQueryBuilder("C")
                                          .leftJoinAndSelect("C.fk_user_id","User")
                                          .getMany();

            if(this.FR.checkIfArrayIsEmpty(list) == undefined)
                    throw new Error(`Napaka seznam Klasifikacij je trenutno prazen.`)


            return res.status(200).json(list);

        } catch(error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }

}