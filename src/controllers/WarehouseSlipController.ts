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
import { WarehouseSlip } from "../entity/WarehouseSlip";
import { WorkOrder } from "../entity/WorkOrder";

export class WarehouseSlipController{

    public FR: FileReader = new FileReader();

    createSlip = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body;

            let Slip: WarehouseSlip = new WarehouseSlip();
            Slip.workorder_id = (this.FR.checkIfItemIsValid(data.workorder_id)) ? null: data.workorder_id;
            Slip.item_width = (this.FR.checkIfItemIsValid(data.item_width)) ? null : data.item_width;
            Slip.item_length = (this.FR.checkIfItemIsValid(data.item_length)) ? null: data.item_length;
            Slip.item_weight = (this.FR.checkIfItemIsValid(data.item_weight)) ? null : data.item_weight;
            Slip.item_gramature = (this.FR.checkIfItemIsValid(data.item_gramature)) ? null: data.item_gramature;
            Slip.item_gramature_average = (this.FR.checkIfItemIsValid(data.item_gramature_average)) ? null: data.item_gramature_average;
            Slip.item_ammount_meters = (this.FR.checkIfItemIsValid(data.item_ammount_meters)) ? null: data.item_ammount_meters;
            Slip.item_thicness = (this.FR.checkIfItemIsValid(data.item_thicness)) ? null: data.item_thicness;
            Slip.item_thicness_average = (this.FR.checkIfItemIsValid(data.item_thicness_average)) ? null: data.item_thicness_average;
            Slip.item_permeability = (this.FR.checkIfItemIsValid(data.item_permeability)) ? null : data.item_permeability;
            Slip.item_permeability_average = (this.FR.checkIfItemIsValid(data.item_permeability_average)) ? null: data.item_permeability_average;
            Slip.sequence_number = (this.FR.checkIfItemIsValid(data.item_sequcne_number)) ? null : data.item_sequcne_number;
            Slip.sequence_number_workorder = (this.FR.checkIfItemIsValid(data.item_sequence_number_workorder)) ? null: data.item_sequence_number_workorder;
            Slip.fk_workorder_id = (this.FR.checkIfObjectIsEmpty(data.fk_workorder_id as WorkOrder) == null) ? null : data.fk_workorder_id as WorkOrder
           
            await AppDataSource.manager.save(Slip);

            let message_info =  `Podatek za DN: ${data.workorder_id} je bil uspešno ustvarjen !`
            return res.status(200).json({
                message: message_info
            })

        } catch(error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }

    getSlips = async (req: Request, res: Response, next: NextFunction) => {
        try {

            let list = await AppDataSource.manager.getRepository(WarehouseSlip)
                                                  .createQueryBuilder("WS")
                                                  .leftJoinAndSelect("WS.fk_user_id","User")
                                                  .leftJoinAndSelect("WS.fk_workorder_id","WorkOrder")
                                                  .leftJoinAndSelect("WorkOrder.fk_alternative_chiper_id","AlternativeChippers")
                                                  .leftJoinAndSelect("WorkOrder.fk_partner_id","User1")
                                                  .leftJoinAndSelect("WorkOrder.fk_user_id","User2")
                                                  .getMany();

            return res.status(200).json(list)

        } catch(error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }

    getSlipsByID = async (req: Request, res: Response, next: NextFunction) => {
        try {

            let list = await AppDataSource.manager.getRepository(WarehouseSlip)
                                                  .createQueryBuilder("WS")
                                                  .leftJoinAndSelect("WS.fk_user_id","User")
                                                  .where({
                                                    workorder_id: req.params.id
                                                  })
                                                  .getMany();
            
            if(this.FR.checkIfArrayIsEmpty(list) == null)
                throw new Error(`Napaka: Za iskan ID: ${req.params.id} je seznam podatkov prazen!`);


            return res.status(200).json(list)

        } catch(error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }

    deleteSlip = async (req: Request, res: Response, next: NextFunction) => {
        try {

            let deleteData = await AppDataSource.manager.getRepository(WarehouseSlip)
                                                        .createQueryBuilder("WS")
                                                        .delete()
                                                        .from(WarehouseSlip)
                                                        .where({ id: req.params.id })
                                                        .execute();

            let error_message: string = `Podatek z IDjem: '${req.params.id}' je bil uspešno izbrisan`;

            return res.status(200).json({
                message: error_message
            })

        } catch(error: Error | any) {
            return res.status(401).json({
                message: error
            });
        }
    }

}