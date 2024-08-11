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

export class WarehouseController{

    public FR: FileReader = new FileReader();

    getList = async (req: Request, res: Response, next: NextFunction) => {

        try {
            let list = await AppDataSource.getRepository(Warehouse)
                                          .createQueryBuilder("W")
                                          .leftJoinAndSelect("W.fk_user_id","User")
                                          .getMany();

            return res.status(200).json(list);

        } catch(error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }

    }

    upload = async (req: Request, res: Response, next: NextFunction) => {
        try{

            const file = req.file;
            const filePath = path.join(process.cwd(), 'src', 'assets', 'other_data',"warehouses.csv");
            const records = await this.FR.readFileAndParse(filePath);

            records.map( async (item: any) => {
                let W: Warehouse = new Warehouse();
                W.active = true;
                W.created_at = new Date();
                W.konto = (item.KONTO == undefined || item.KONTO == null || item.KONTO == '') ? null: item.KONTO;
                W.movement = (item.PRENOS == undefined || item.PRENOS == null || item.PRENOS == '') ? null : item.PRENOS;
                W.status = (item.STATUS == undefined || item.STATUS == null || item.STATUS == '') ? null : item.STATUS;
                W.stm = (item.STM == undefined || item.STM == null || item.STM == '') ? null : item.STM;
                W.stock_type = (item.TIP_VZALOG == undefined || item.TIP_VZALOG == null || item.TIP_VZALOG == '') ? null: item.TIP_VZALOG;
                W.title = (item.NAZIV == undefined || item.NAZIV == null || item.NAZIV == '') ? null: this.FR.convertToSlovenian(item.NAZIV);
                W.unit = (item.ENOTA == undefined || item.ENOTA == null || item.ENOTA == '') ? null: item.ENOTA; 
                await AppDataSource.manager.save(W);
            });

            return res.status(200).json({
                message: "Podatki za skladišča so bili uspešno shranjeni !"
            });

        } catch(error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }

    }


}