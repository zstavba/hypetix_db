import path = require("path");
import { AppDataSource } from "../data-source";
import { Country } from "../entity/Country";
import { GroupType } from "../entity/GroupType";
import { ZipCode } from "../entity/ZipCode";
import * as  fs from 'fs';
import {parse} from 'csv-parse';
import { NextFunction, Request, Response } from "express";
import { ArticleType } from "../entity/ArticleType";
import { FileReader } from "../functions/FileReader";
import { User } from "../entity/User";
import { Areas } from "../entity/Areas";

export class AreasController{

    public FR: FileReader = new FileReader();

    get = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let list = await AppDataSource.getRepository(Areas)
                                          .createQueryBuilder("A")
                                          .leftJoinAndSelect("A.fk_user_id","User")
                                          .getMany();

            return res.status(200).json(list);


        } catch(error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }

    }

    getInformation = async (req: Request, res: Response, next:NextFunction) => {
        try {
            let getInfo = await AppDataSource.getRepository(Areas)
                                             .createQueryBuilder("A")
                                             .leftJoinAndSelect("A.fk_user_id","User")
                                             .where({
                                                id: req.params.id
                                             })
                                             .getOne();

            if(this.FR.checkIfObjectIsEmpty(getInfo) == null)
                    throw new Error(`Napaka: Iskan objekt pod IDjem:  ${req.params.id} ni bil najden !`)
            
            return res.status(200).json(getInfo);
            
        } catch(error: Error | any){
            return res.status(401).json({
                message: error.message
            });
        }

    }

    upload = async (req: Request, res: Response, next: NextFunction) => {
        try {

            const filePath = path.join(process.cwd(), 'src', 'assets', 'other_data',"areas.csv");
            const records = await this.FR.readFileAndParse(filePath);

            records.map(async (item: any) => {
                let Area: Areas = new Areas();
                Area.active = true;
                Area.created_at == new Date();
                Area.description = (this.FR.checkIfItemIsValid(item.OPIS)) ? null : this.FR.convertToSlovenian(item.OPIS);
                Area.area = (this.FR.checkIfItemIsValid(item.OBMOCJE)) ? null: item.OBMOCJE;
                Area.municipality = (this.FR.checkIfItemIsValid(item.OBCINA)) ? null : item.OBCINA;
                Area.superiors = (this.FR.checkIfItemIsValid(item.NADREJENI)) ? null : item.NADREJENI;

               await AppDataSource.manager.save(Area);


            });


            return res.status(200).json({
                message: "Podatki za območja so bili uspešno uvoženi !"
            })

        } catch(error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }


    }


}