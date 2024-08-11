import path = require("path");
import { AppDataSource } from "../data-source";
import { Country } from "../entity/Country";
import { GroupType } from "../entity/GroupType";
import { ZipCode } from "../entity/ZipCode";
import * as  fs from 'fs';
import {parse} from 'csv-parse';
import { NextFunction, Request, Response } from "express";
import { CustomTariffs } from "../entity/CustomTariffs";
import { MeasurmentUnits } from "../entity/MeasurmentUnits";
import { FileLogger } from "typeorm";
import { FileReader } from "../functions/FileReader";

export class CustomTariffsController{

    public FR: FileReader = new FileReader();

    get = async (req: Request, res: Response, next: NextFunction) => {
        try {
            
            const list = await AppDataSource.getRepository(CustomTariffs)
                                            .createQueryBuilder("CT")
                                            .leftJoinAndSelect("CT.fk_em_id","User")
                                            .getMany();

            return res.status(200).json(list);
        } catch(error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }

    getNumber = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const list = await AppDataSource.getRepository(CustomTariffs)
                                            .createQueryBuilder("CT")
                                            .leftJoinAndSelect("CT.fk_user_id","User")
                                            .take(parseInt(req.params.number))
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

            let data = await AppDataSource.manager.findBy(CustomTariffs,{
                id: parseInt(req.params.id)
            });

            if(this.FR.checkIfObjectIsEmpty(data[0]) == null)
                throw new Error(`Napaka: Iskan objekt z IDjem: ${req.params.id} ni bil najden ali pa ne obstaja !`);

            return res.status(200).json(data);

        } catch(error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }

    uploadCustomTariffsfile = async (req: Request, res: Response, next: NextFunction) => {
        
        try {
            const file = req.file;
            const filePath = path.join(process.cwd(), 'src', 'assets', 'uploads', file.filename);
            let records = await  this.FR.readFileAndParse(filePath);

            records.map(async (item:any) => {

                //console.log(item);
                let CT: CustomTariffs = new CustomTariffs();
                CT.active = true;
                CT.created_at = new Date();
                let findEM = await AppDataSource.manager.findBy(MeasurmentUnits, {
                    id: item.fk_em_id
                });
                //console.log(item.fk_em_id);

                CT.fk_em_id = (this.FR.checkIfObjectIsEmpty(findEM[0]) == null) ? null: findEM[0];
                CT.ident = (item.id == undefined || item.id == null) ? null : item.id;
                CT.name = (item.title == undefined || item.title == null) ? null : this.FR.convertToSlovenian(item.title); 
                CT.position = (item.position == undefined || item.position == null) ? null: item.position;
                CT.stage = (item.stage == undefined || item.stage == null) ? null : item.stage;
                CT.created_at = new Date();

                await AppDataSource.manager.save(CT);
                //console.log(CT);
                
                   
             
            });

            return res.status(200).json({
                message: "Podatki za carinske tarife so bile uspešno shranjene !"
            });
        } catch (error: Error | any)  {
            return res.status(401).json({
                message: error.message
            });
        }
        

    }


}