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
import { ClassificationWorkProceduress } from "../entity/ ClassificationWorkProceduress";

export class ClassificationWorkProceduressController{
    
    public FR: FileReader = new FileReader();

    get = async (req: Request, res: Response, next: NextFunction) => {
        try {

            let list = await AppDataSource.manager.getRepository(ClassificationWorkProceduress)
                                                  .createQueryBuilder("CWP")
                                                  .leftJoinAndSelect("CWP.fk_user_id","User")
                                                  .getMany();
            
            return res.status(200).json(list);

        } catch(error : Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }

    upload = async (req: Request, res: Response, next: NextFunction) => {
        try {

            const filePath = path.join(process.cwd(), 'src', 'assets', 'other_data', "cwp.csv");
            const records = await this.FR.readFileAndParse(filePath);


            records.map(  async (item: any) =>{
                let CWP: ClassificationWorkProceduress = new ClassificationWorkProceduress();
                CWP.active = true; 
                CWP.title = (this.FR.checkIfItemIsValid(item.NAZIV)) ? null: this.FR.convertToSlovenian(item.NAZIV);
                CWP.type = (this.FR.checkIfItemIsValid(item.TIP_SKUP)) ? null : item.TIP_SKUP;

               await AppDataSource.manager.save(CWP);

            })

            return res.status(200).json({
                message: "Podatki za Klasifikacije delovnih postopkov so bili uspešno shranjeni !"
            });

        } catch (error: Error | any) {
            return res.status(401).json({
                message: error.message
            })
        }
    }


}