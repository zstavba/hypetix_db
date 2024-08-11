import path = require("path");
import { AppDataSource } from "../data-source";
import { Country } from "../entity/Country";
import { GroupType } from "../entity/GroupType";
import { ZipCode } from "../entity/ZipCode";
import * as  fs from 'fs';
import {parse} from 'csv-parse';
import { NextFunction, Request, Response } from "express";
import { FileReader } from "../functions/FileReader";
import { Locations } from "../entity/Locations";

export class LocationsController{

    public FR: FileReader = new FileReader();


    get = async (req: Request, res: Response, next: NextFunction) => {
        try {

            let list = await AppDataSource.getRepository(Locations)
                                          .createQueryBuilder("L")
                                          .leftJoinAndSelect("L.fk_user_id","User")
                                          .getMany();



            return res.status(200).json(list);


        } catch(error: Error | any){
            return res.status(401).json({
                message: error.message
            });
        }


    }

    upload = async (req: Request, res: Response, next: NextFunction) => {
        try {

            const filePath = path.join(process.cwd(), 'src', 'assets', 'other_data',"locations.csv");
            const records = await this.FR.readFileAndParse(filePath);

            records.map(async (item: any) => {
                let Location: Locations = new Locations();

                Location.created_at = new Date();
                Location.active = true; 
                Location.warehouse_id = (this.FR.checkIfItemIsValid(item.ID_SKLA)) ? null : item.ID_SKLA;
                Location.length = (this.FR.checkIfItemIsValid(item.DOLZINA)) ? null : item.DOLZINA;
                Location.width = (this.FR.checkIfItemIsValid(item.SIRINA)) ? null: item.SIRINA;
                Location.height = (this.FR.checkIfItemIsValid(item.VISINA)) ? null: item.VISINA;
                Location.location_id = (this.FR.checkIfItemIsValid(item.ID_LOK)) ? null:  item.ID_LOK;
                Location.title = (this.FR.checkIfItemIsValid(item.NAZIV)) ? null : this.FR.convertToSlovenian(item.NAZIV);

                await AppDataSource.manager.save(Location);
;            });


            return res.status(200).json({
                message: "Podatki za Lokacije so bili uspoešno uvoženi !"
            })

        } catch (error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }


}