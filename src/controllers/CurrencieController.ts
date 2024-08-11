import path = require("path");
import { AppDataSource } from "../data-source";
import { Country } from "../entity/Country";
import { ZipCode } from "../entity/ZipCode";
import * as  fs from 'fs';
import {parse} from 'csv-parse';
import { MeasureMemoryMode } from "vm";
import { MeasurmentUnits } from "../entity/MeasurmentUnits";
import { GroupType } from "../entity/GroupType";
import { Request, Response, NextFunction, response } from 'express';
import { FileReader } from "../functions/FileReader";
import { Currencie } from "../entity/Currencie";

export class CurrencieController{
    
    public FR: FileReader = new FileReader();

    get = async (req: Request, res: Response, next: NextFunction) => {
        try {

            let getList = await AppDataSource.getRepository(Currencie)
                                             .createQueryBuilder("C")
                                             .leftJoinAndSelect("C.fk_user_id","User")
                                             .getMany();
            
            return res.status(200).json(getList);

        } catch(error: Error | any){
            return res.status(401).json({
                message: error.message
            });
        }
    }

    getInformation = async (req: Request, res: Response, next: NextFunction ) => {
        try {
            let getInfo = await AppDataSource.getRepository(Currencie)
                                             .createQueryBuilder("C")
                                             .leftJoinAndSelect("C.fk_user_id","User")
                                             .where({
                                                id: req.params.id
                                             })
                                             .getOne();

            let check = this.FR.checkIfObjectIsEmpty(getInfo);
            if(check == null)
                throw new Error(`Napaka: Objekt pod iskanim IDjem: ${req.params.id} ni bil najden.`)

            return res.status(200).json(getInfo);


        } catch (error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }

    }


    upload = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const file = req.file;
            const filePath = path.join(process.cwd(), 'src', 'assets', 'upload',file.filename);
            const records = await this.FR.readFileAndParse(filePath);

            records.map(async (item: any) => {
                let c: Currencie = new Currencie();
                c.active = true;
                c.created_at = new Date();
                c.title = (item.NAZIV == undefined || item.NAZIV == null || item.NAZIV == '') ? null : this.FR.convertToSlovenian(item.NAZIV);
                c.status = (item.STATUS == undefined || item.STATUS == null || item.STATUS == '') ? null : item.STATUS;
                c.country = (item.DRZAVA == undefined || item.DRZAVA == null || item.DRZAVA == '') ? null :  item.DRZAVA;
                c.code = (item.KODA == undefined || item.KODA == null || item.KODA == '') ? null : item.KODA;
                c.type = (item.ID == undefined || item.ID == null || item.ID == '') ? null :  item.ID;
                
                await AppDataSource.manager.save(c);
            });

            return res.status(200).json({
                message: "Podatki za Valute so bili uspešno uvoženi."
            })

        } catch(error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }

}