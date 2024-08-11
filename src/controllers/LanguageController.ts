import path = require("path");
import { AppDataSource } from "../data-source";
import { Country } from "../entity/Country";
import { GroupType } from "../entity/GroupType";
import { ZipCode } from "../entity/ZipCode";
import * as  fs from 'fs';
import {parse} from 'csv-parse';
import { NextFunction, Request, Response } from "express";
import { FileReader } from "../functions/FileReader";
import { Language } from "../entity/Language";

export class LanguageController{

    public FR: FileReader = new FileReader();


    get = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let list = await AppDataSource.getRepository(Language)
                                          .createQueryBuilder("L")
                                          .leftJoinAndSelect("L.fk_user_id","User")
                                          .getMany();

                                          
            return res.status(200).json(list);


        } catch (error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }

    upload = async (req: Request, res:Response, next: NextFunction) => {
        try {
            const filePath = path.join(process.cwd(), 'src', 'assets', 'other_data',"languages.csv");
            const records = await this.FR.readFileAndParse(filePath);

            records.map( async (item: any) => {
                let L: Language = new Language();
                L.active = true;
                L.created_at = new Date();
                L.title = (item.OPIS == undefined || item.OPIS == null || item.OPIS == '') ? null: this.FR.convertToSlovenian(item.OPIS);
                L.attribute = (item.ATRIBUT == undefined || item.ATRIBUT == null || item.ATRIBUT == '') ? null : item.ATRIBUT;
                L.status = (item.STATUS == undefined || item.STATUS == null || item.STATUS == '') ? null : item.STATUS;
                
                await AppDataSource.manager.save(L);
           
            });

            return res.status(200).json({
                message: "Podatki za Jezike so bili uspešno shranjeni !"
            })

        } catch(error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }


}