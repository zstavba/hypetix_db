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

export class TaxController{

    public FR: FileReader = new FileReader();

    get = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let list = await AppDataSource.getRepository(Tax)
                                          .createQueryBuilder("TAX")
                                          .leftJoinAndSelect("TAX.fk_user_id","User")
                                          .getMany();

            return res.status(200).json(list)

        } catch(error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }

    getNumber = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let list = await AppDataSource.getRepository(Tax)
                                          .createQueryBuilder("TAX")
                                          .leftJoinAndSelect("TAX.fk_user_id","User")
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
            let findTax = await AppDataSource.manager.findBy(Tax,{
                id: parseInt(req.params.id)
            });

            if(this.FR.checkIfObjectIsEmpty(findTax[0]) == null)
                throw new Error(`Napaka: Objekt pod IDjem: ${req.params.id} ni bil najden ali pa ne obstaja !`)

            return res.status(200).json(findTax[0]);


        } catch(error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }

    upload = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let file = req.file;
            const filePath = path.join(process.cwd(), 'src', 'assets', 'upload', file.filename);
            const records = await this.FR.readFileAndParse(filePath);

            records.map(async item => {
             let TAX: Tax = new Tax();
             TAX.active = true;
             TAX.created_at = new Date();
             TAX.ident = (item.ID == null || item.ID == undefined) ? null : item.ID;
             TAX.stage = (item.STOPNJA == null || item.STOPNJA == undefined) ? null : item.STOPNJA;
             TAX.title = (item.NAZIV == null || item.NAZIV == undefined) ? null :  this.FR.convertToSlovenian(item.NAZIV);
             TAX.type = (item.VRSTA == null || item.VRSTA == undefined) ? null : item.VRSTA;

             await AppDataSource.manager.save(TAX);
            });

            return res.status(200).json({
                message: "Podatki za davek so bili uspešno shranjeni !"
            });

        } catch(error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }



}