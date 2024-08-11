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

export class ExchangeRatesController{

    public FR: FileReader = new FileReader();

    get = async (req: Request, res: Response, next: NextFunction) => {
        try {

            const getList = await AppDataSource.getRepository(ExchangeRates)
                                               .createQueryBuilder("ER")
                                               .leftJoinAndSelect("ER.fk_user_id","User")
                                               .getMany();

            return res.status(200).json(getList)

        } catch(error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }

    getInformation = async (req: Request, res: Response, next: NextFunction) => {
        try {

            let getInfo = await AppDataSource.getRepository(ExchangeRates)
                                              .createQueryBuilder("ER")
                                              .leftJoinAndSelect("ER.fk_user_id","User")
                                              .where({
                                                id: req.params.id
                                              })
                                              .getOne();

            let check  = this.FR.checkIfObjectIsEmpty(getInfo);
            if(check == null)
                throw new Error(`Napaka: Iskan objekt pod IDjem: ${req.params.id} ni bil najden !`)                                  

            return res.status(200).json(getInfo);                                  

        } catch(error: Error | any) {
            return res.status(401).json({
                messagte: error.message
            });
        }


    }

    upload = async  (req: Request, res: Response, next: NextFunction) => {
        try {
            const filePath = path.join(process.cwd(), 'src', 'assets', 'other_data', "echange_rates.csv");
            const records = await this.FR.readFileAndParse(filePath);

            records.map(async (item: any) => {
                let ER: ExchangeRates = new ExchangeRates();
                ER.active = true;
                ER.created_at = new Date();
                ER.currency = (item.VALUTA  == undefined || item.VALUTA == null || item.VALUTA == '') ? null: item.VALUTA;
                ER.type = (item.TIP == undefined || item.TIP == null || item.TIP == '')? null: item.TIP;
                ER.unit = (item.ENOTA == undefined || item.ENOTA == null || item.ENOTA == '')? null: item.ENOTA;
                ER.course = (item.TECAJ == undefined || item.TECAJ == null || item.TECAJ == '') ? null: item.TECAJ;
                ER.status = (item.STATUS == undefined || item.STATUS == null || item.STATUS == '') ? null: item.STATUS;
                ER.course_value = (item.TECAJ_VAL == undefined || item.TECAJ_VAL == null || item.TECAJ_VAL == '') ? null: item.TECAJ_VAL

                await AppDataSource.manager.save(ER);
                
            });

            return res.status(200).json({
                message: "Podatki za Tečajno Listo so bili uspešno uvoženi !"
            })

        } catch(error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }


}