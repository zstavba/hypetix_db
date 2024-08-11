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
import { UnitAboveStorage } from "../entity/UnitAboveStorage";

export class UnitAboveStorageController{

    public FR: FileReader = new FileReader();

    get = async (req: Request, res: Response, next: NextFunction) => {

        try {
            let list = await AppDataSource.getRepository(UnitAboveStorage)
                                          .createQueryBuilder("UAS")
                                          .leftJoinAndSelect("UAS.fk_user_id","User")
                                          .getMany();

            return res.status(200).json(list);

        } catch (error: Error | any) {
            return res.status(401).json({
                message: error.message
            })
        }

    }

    getInformation = async (req: Request, res: Response, next: NextFunction) => {

        try {
            let info = await AppDataSource.getRepository(UnitAboveStorage)
                                          .createQueryBuilder("UAS")
                                          .leftJoinAndSelect("UAS.fk_leader_id","User")
                                          .where({
                                            id: req.params.id
                                          })
                                          .getOne();
            
            let check = this.FR.checkIfObjectIsEmpty(info);
            if(check == null)
                throw new Error(`Napaka: Za iskan objekt pod IDjem: ${req.params.id} ni bil najden ali pa ne obstaja !`)

            return res.status(200).json(info);

        } catch(error: Error | any) {
            return res.status(401).json({
                message: error.message
            })
        }

    }

    upload = async (req: Request, res: Response, nect: NextFunction) => {
        try {

            const filePath = path.join(process.cwd(), 'src', 'assets', 'other_data',"units_above_storage.csv");
            const records = await this.FR.readFileAndParse(filePath);

            records.map(async (item: any) => {
                let UAS: UnitAboveStorage = new UnitAboveStorage();
                UAS.active = true;
                UAS.created_at = new Date();
                UAS.stm = (item.STM == undefined || item.STM == null || item.STM == '') ? null: item.STM;
                UAS.points = (item.TOCKA == undefined || item.TOCKA == null || item.TOCKA == '') ? null: item.TOCKA;
                UAS.title = (item.NAZIV == undefined || item.NAZIV == null || item.NAZIV == '') ?  null: this.FR.convertToSlovenian(item.NAZIV);
                UAS.type = (item.TIP == undefined || item.TIP == null || item.TIP == '') ? null : item.TIP;

                await AppDataSource.manager.save(UAS);
            });


            return res.status(200).json({
                message: "Podatki za Enote nad skladiščenjem so bili uspešno shranjeni !"
            });

        } catch(error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }


    }

}