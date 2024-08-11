import path = require("path");
import { AppDataSource } from "../data-source";
import { Country } from "../entity/Country";
import { GroupType } from "../entity/GroupType";
import { ZipCode } from "../entity/ZipCode";
import * as  fs from 'fs';
import {parse} from 'csv-parse';
import { NextFunction, Request, Response } from "express";
import { FileReader } from "../functions/FileReader";

export class GroupTypeController{

    public FR: FileReader = new FileReader();

    uploadGroupType = async (req: any, res:any, next: any) => {
        try {
            const filePath = path.join(process.cwd(), 'src', 'assets', 'other_data', "group_4.csv");
            const records = await this.FR.readFileAndParse(filePath);

            records.map(async (item: any) => {
                let GP: GroupType = new GroupType();
                GP.active = true;
                GP.idg = (item.IDG == undefined || item.IDG == null) ? null : item.IDG;
                GP.status = (item.STATUS == undefined || item.STATUS == null) ? null : item.STATUS;
                GP.title = (item.NAZIV == undefined || item.NAZIV == null) ? null : this.FR.convertToSlovenian(item.NAZIV);
                GP.type = (item.TIP_SKUP == undefined || item.TIP_SKUP == null) ? null : item.TIP_SKUP;
                GP.created_at = new Date();
                
                await AppDataSource.manager.save(GP);
            });

            return res.status(200).json({
                message: "Podatki od tipa skupine so bili uspešno shranjeni !"
            });


        } catch(error: Error | any){
            return res.status(401).json({
                message: error.message
            });
        }
    }

    getGroupType = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let getGT = await AppDataSource.getRepository(GroupType)
                                           .createQueryBuilder("GT")
                                           .leftJoinAndSelect("GT.fk_user_id","User")
                                           .getMany();
            
            return res.status(200).json(getGT);
        } catch(error: Error | any){
            return res.status(401).json({
                message: error.message
            });
        }
    }

    getByType = async (req: Request, res: Response, next: NextFunction) => {

        try {
            let list = await AppDataSource.getRepository(GroupType)
                                           .createQueryBuilder("GT")
                                           .leftJoinAndSelect("GT.fk_user_id","User")
                                           .where({
                                                type: req.params.type
                                           })
                                           .getMany();
                        
            if(this.FR.checkIfArrayIsEmpty(list) == undefined) 
                throw new Error(`Napaka: Iskan tip skupine ni bil najden !`)
            
            return res.status(200).json(list);         


        } catch(error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }

    }

}