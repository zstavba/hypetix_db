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
import { FileReader } from "../functions/FileReader";

export class PerformanceController{

    public FR: FileReader = new FileReader();

    get = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let list = await AppDataSource.getRepository(PerformanceWork)
                                          .createQueryBuilder("P")
                                          .leftJoinAndSelect("P.fk_user_id","User")
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
            let info = await AppDataSource.getRepository(PerformanceWork)
                                          .createQueryBuilder("P")
                                          .leftJoinAndSelect("P.fk_user_id","User")
                                          .where({
                                            id: req.params.id
                                          })
                                          .getOne();
            
            return res.status(200).json(info);

        } catch(error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }

    upload = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const file = req.file;
            const filePath = path.join(process.cwd(), 'src', 'assets', 'other_data', "performance.csv");
            let records = await  this.FR.readFileAndParse(filePath);

            records.map(async item => {
                let P: PerformanceWork = new PerformanceWork();
                P.active = true;
                P.created_at = new Date();
                P.extra = (item.DODATEK == undefined || item.dodatek == null) ? null : item.DODATEK;
                P.title = (item.NAZIV == undefined || item.NAZIV == null) ? null: this.FR.convertToSlovenian(item.NAZIV);
                P.performance = (item.IZVEDBA == undefined || item.IZVEDBA == null) ? null: item.IZVEDBA;

               await AppDataSource.manager.save(P);
            });

            return res.status(200).json({
                message: "Podatki za izvedbe so bili uspešno shranjeni !"
            })

        } catch (error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }

}