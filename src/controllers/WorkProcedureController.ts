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
import { Warehouse } from "../entity/Warehouse";
import { FileReader } from "../functions/FileReader";

export class WorkProcedureController{

    public FR: FileReader = new FileReader();

    get = async (req: Request, res: Response, next: NextFunction) => {
        try {

        } catch (error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }

    getInformation = async (req: Request, res: Response, next: NextFunction) => {
        try {

        } catch (error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }
    
    upload = async (req: Request, res: Response, next: NextFunction) => {
        try {

        } catch (error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }

}