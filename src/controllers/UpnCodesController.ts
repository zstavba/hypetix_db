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
import { UpnCodes } from "../entity/UpnCodes";

export class UpnCodesController{

    public FR: FileReader = new FileReader();

    get = async (req: Request, res: Response, next: NextFunction) => {
        try{

            let list = await AppDataSource.getRepository(UpnCodes)
                                          .createQueryBuilder("UPN")
                                          .leftJoinAndSelect("UPN.fk_user_id","User")
                                          .getMany();

            if(this.FR.checkIfArrayIsEmpty(list) == undefined)
                throw new Error(`Napaka: Seznam podatkov za UPN Kode namena je trenutno prazen.`)


            return res.status(200).json(list)

        } catch(error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }

    getInformation = async (req: Request, res: Response, next: NextFunction) => {
        try{

            let info = await AppDataSource.getRepository(UpnCodes)
                                          .createQueryBuilder("UPN")
                                          .leftJoinAndSelect("UPN.fk_user_id","User")
                                          .where({
                                            id: req.params.id
                                          })
                                          .getOne();
            
            if(this.FR.checkIfObjectIsEmpty(info) == null)
                throw new Error(`Napaka: Iskan objekt pod IDjem: ${req.params.id} ni bil najden ali pa ne obstaja !`);

            return res.status(200).json(info);

        } catch(error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }

    upload = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const filePath = path.join(process.cwd(), 'src', 'assets', 'other_data',"upn_codes.csv");
            const records = await this.FR.readFileAndParse(filePath);

            records.map(async (item:any) => {
                let UPN: UpnCodes = new UpnCodes();
                UPN.active = true; 
                UPN.created_at = new Date();
                UPN.title = (this.FR.checkIfItemIsValid(item.title)) ? null: this.FR.convertToSlovenian(item.title)
                UPN.attribute = (this.FR.checkIfItemIsValid(item.attribute)) ? null : item.attribute; 
                UPN.status = (this.FR.checkIfItemIsValid(item.status)) ? null: item.status;
                UPN.description = (this.FR.checkIfItemIsValid(item.description)) ? null: this.FR.convertToSlovenian(item.description);
                UPN.type = (this.FR.checkIfItemIsValid(item.type)) ? null: item.type;

               await AppDataSource.manager.save(UPN);



            });


            return res.status(200).json({
                message: "Podatki za UPN Kode namena so bili uspešno naloženi."
            })

        } catch(error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }

}