import path = require("path");
import { AppDataSource } from "../data-source";
import { Country } from "../entity/Country";
import { GroupType } from "../entity/GroupType";
import { ZipCode } from "../entity/ZipCode";
import * as  fs from 'fs';
import {parse} from 'csv-parse';
import { NextFunction, Request, Response } from "express";
import { MeasurmentUnits } from "../entity/MeasurmentUnits";
import { FileReader } from "../functions/FileReader";

export class MeassurmentUnitsController{

    public FR: FileReader = new FileReader();

    get = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let list = await AppDataSource.getRepository(MeasurmentUnits)
                                           .createQueryBuilder("MU")
                                           .leftJoinAndSelect('MU.fk_user_id',"User")
                                           .getMany();

            return res.status(200).json(list);

        } catch (error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }

    getNumber = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const list = await AppDataSource.getRepository(MeasurmentUnits)
                                            .createQueryBuilder("EM")
                                            .take(parseInt(req.params.number))
                                            .getMany();
            

            return res.status(200).json(list);

        } catch (error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }

    getInformation = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data: number = parseInt(req.params.id);
            const EMInfo =  await AppDataSource.manager.findBy(MeasurmentUnits, {
                id: data
            }); 

            if(this.FR.checkIfObjectIsEmpty(EMInfo) == null)
                throw new Error(`Napaka: Iskan objekt z IDjem: ${data} ni bil najden, ali pa ne obstaja!`)

            return res.status(200).json(EMInfo);
        } catch (error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }

    uploadFile = async (req: Request, res: Response, next: NextFunction) => {
        try {

            const file = req.file;
            const filePath = path.join(process.cwd(), 'src', 'assets', 'uploads', file.filename);
            let records = await  this.FR.readFileAndParse(filePath);


            records.map(async item => {
                let EM: MeasurmentUnits = new MeasurmentUnits();
                EM.active = true;
                EM.created_at = new Date();
                EM.title = (item.NAZIV == null || item.NAZIV == undefined) ? null : this.FR.convertToSlovenian(item.NAZIV);
                EM.idg = (item.IDG == null || item.IDG == undefined) ? null: item.IDG;
                
                await AppDataSource.manager.save(EM);

            })

            return res.status(200).json({
                message: "Podatki za merske enote so bili uspešno shranjeni"
            })

        } catch (error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }




}