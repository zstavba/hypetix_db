import path = require("path");
import { AppDataSource } from "../data-source";
import { Country } from "../entity/Country";
import { ZipCode } from "../entity/ZipCode";
import * as  fs from 'fs';
import {parse} from 'csv-parse';
import { MeasureMemoryMode } from "vm";
import { MeasurmentUnits } from "../entity/MeasurmentUnits";
import { GroupType } from "../entity/GroupType";
import { Request, Response, NextFunction } from 'express';
import { FileReader } from "../functions/FileReader";

export class CodersController{
    
    public FR: FileReader = new FileReader();

    upload = async (req:Request, res:Response, next:NextFunction) => {
        try{
            const file = req.file;            
            const filePath = path.join(process.cwd(), 'src', 'assets', 'other_data', "coder.csv");
            const records = await this.FR.readFileAndParse(filePath);

            records.map(async (item: any) => {
                
                console.log(item);
            });

            return res.status(200).json({
                message: "Vaši podatki so bili uspešno shranjeni"
            })

        } catch(error: Error | any){
            return res.status(401).json({
                message: error.message
            });
        }
    }







}