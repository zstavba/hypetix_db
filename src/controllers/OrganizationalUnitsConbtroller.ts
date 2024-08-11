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
import { OrganizationalUnits } from "../entity/OrganizationalUnits";

export class OrganizationalUnitsController{

    public FR: FileReader = new FileReader();

    get = async (req: Request, res: Response, next: NextFunction) => {
        try {

            let list = await AppDataSource.getRepository(OrganizationalUnits)
                                          .createQueryBuilder("OU")
                                          .leftJoinAndSelect("OU.fk_user_id","User1")
                                          .leftJoinAndSelect('OU.fk_leader_id',"User2")
                                          .getMany();

            if(this.FR.checkIfArrayIsEmpty(list) == undefined)
                throw new Error(`Napaka: Seznam podatkov za Organizacijske Enote je trenutno prazen.`)

            return res.status(200).json(list);

        } catch(error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }


    }

    getInformation = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let info = await AppDataSource.getRepository(OrganizationalUnits)
                                          .createQueryBuilder("OU")
                                          .leftJoinAndSelect("OU.fk_user_id","User1")
                                          .leftJoinAndSelect("OU.fk_leader_id","User2")
                                          .where({
                                            id: req.params.id
                                          })
                                          .getOne();

            if(this.FR.checkIfObjectIsEmpty(info) == null)
                throw new Error(`Napaka: Iskan objekt pod IDjem: ${req.params.id} ni bil najden ali ne obstaja !`)


            return res.status(200).json(info);

        } catch(error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }       
    }


    upload = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const filePath = path.join(process.cwd(), 'src', 'assets', 'other_data', "organizational_units.csv");
            let records = await  this.FR.readFileAndParse(filePath);

            records.map(async (item: any) => {
                let OU: OrganizationalUnits = new OrganizationalUnits();
                OU.active = true;
                OU.created_at = new Date();
                OU.title = (this.FR.checkIfItemIsValid(item.NAZIV)) ? null: this.FR.convertToSlovenian(item.NAZIV);
                OU.stm = (this.FR.checkIfItemIsValid(item.STM)) ? null : item.STM;
                OU.above_stm = (this.FR.checkIfItemIsValid(item.NAD_STM)) ? null: item.NAD_STM;
                OU.type = (this.FR.checkIfItemIsValid(item.TIP)) ? null : item.TIP;
                OU.status = (this.FR.checkIfItemIsValid(item.STATUS)) ? null: item.STATUS;

                await AppDataSource.manager.save(OU);

            });


            return res.status(200).json({
                message: "Podatki za Organizacijske Enote so bili uspešno shranjeni !"
            });

        } catch(error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }


}