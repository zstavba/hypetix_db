import path = require("path");
import { AppDataSource } from "../data-source";
import { Country } from "../entity/Country";
import { GroupType } from "../entity/GroupType";
import { ZipCode } from "../entity/ZipCode";
import * as  fs from 'fs';
import {parse} from 'csv-parse';
import { NextFunction, Request, Response } from "express";
import { MeasurmentUnits } from "../entity/MeasurmentUnits";
import { PerformanceWork } from "../entity/Performance";
import { Shipping } from "../entity/Shipping";
import { FileReader } from "../functions/FileReader";
import { ExchangeRates } from "../entity/EchangeRates";
import { PriceType } from "../entity/PriceType";

export class PriceTypeController{

    public FR: FileReader = new FileReader();

    getInformation = async (req: Request, res: Response, next: NextFunction) => {
            try{
                let getInfo = await AppDataSource.getRepository(PriceType)
                                                 .createQueryBuilder("PT")
                                                 .leftJoinAndSelect("PT.fk_user_id","User")
                                                 .where({
                                                    id: req.params.id
                                                 })
                                                 .getOne();
                let check = this.FR.checkIfObjectIsEmpty(getInfo);
                if(check == null)
                    throw new Error(`Napaka: Iskan objekt pod IDjem: ${req.params.id} ni bil najden !`);

                return res.status(200).json(getInfo);

            } catch(error: Error | any){
                return res.status(401).json({
                    message: error.message
                });
            }


    }

    get = async (req: Request, res: Response, next: NextFunction) => {
        try{
            let getList = await AppDataSource.getRepository(PriceType)
                                             .createQueryBuilder("PT")
                                             .leftJoinAndSelect("PT.fk_user_id","User")
                                             .getMany();
            
            return res.status(200).json(getList);

        } catch(error: Error | any){
            return res.status(401).json({
                message: error.message
            });
        }

    }


    upload = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const filePath = path.join(process.cwd(), 'src', 'assets', 'other_data', "price_type.csv");
            const records = await this.FR.readFileAndParse(filePath);

            records.map(async (item: any) => {
                let PT: PriceType = new PriceType();
                PT.active = (item.AKTIVEN  == undefined  || item.AKTIVEN == null) ? null: item.AKTIVEN;
                PT.created_at = new Date();
                PT.title = (item.NAZIV == undefined  || item.NAZIV == null || item.NAZIV == '')? null : this.FR.convertToSlovenian(item.NAZIV);
                PT.status = (item.status == undefined || item.STATUS == null || item.STATUS == '') ? null :  item.STATUS;
                PT.type = (item.TIP_CENE == undefined || item.TIP_CENE == null || item.TIP_CENE == '')? null: item.TIP_CENE;
                
               await AppDataSource.manager.save(PT);

                
            });

            return res.status(200).json({
                message: "Podatki za Tip Cene so bili uspešno uvoženi"
            })

        } catch(error: Error | any){
            return res.status(401).json({
                message: error.message
            });
        }

    }


}