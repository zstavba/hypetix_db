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

export class ShippingController{


    public FR: FileReader = new FileReader();

    getInforomation = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let getObject = await AppDataSource.getRepository(Shipping)
                                               .createQueryBuilder("S")
                                               .leftJoinAndSelect("S.fk_user_id","User")
                                               .where({
                                                id: req.params.id
                                               })
                                               .getOne();
            
            return res.status(200).json(getObject);

        } catch(error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }

    get = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let shipping_method_list = await AppDataSource.getRepository(Shipping)
                                                          .createQueryBuilder("S")
                                                          .leftJoinAndSelect('S.fk_user_id',"User")
                                                          .getMany();

            return res.status(200).json(shipping_method_list);

        } catch(error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }

    }

    upload = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const file = req.file;            
            const filePath = path.join(process.cwd(), 'src', 'assets', 'uploads',file.filename);
            const records = await this.FR.readFileAndParse(filePath);

            records.map(async (item: any) => {
                let ShippingMethod: Shipping = new Shipping();
                ShippingMethod.active = true;
                ShippingMethod.created_at = new Date();
                ShippingMethod.title = (item.OPIS == null || item.OPIS == undefined || item.OPIS == '') ? null : this.FR.convertToSlovenian(item.OPIS);
                ShippingMethod.status = (item.STATUS == null || item.STATUS == undefined || item.STATUS == '') ? null: item.STATUS;
                ShippingMethod.attribute = (item.ATRIBUT == null || item.ATRIBUT == undefined || item.ATRIBUT == '') ? null: item.ATRIBUT;

                await AppDataSource.manager.save(ShippingMethod);

            });

            return res.status(200).json({
                message: "Podatki za način odpreme je bil uspešno uvožen."
            })

        } catch(error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }

}