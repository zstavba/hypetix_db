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
import { MaterialSheet } from "../entity/MaterialSheet";
import { User } from "../entity/User";
import { TechnologicalUnits } from "../entity/TechnologicalUnits";
import { Warehouse } from "../entity/Warehouse";
import { WorkCenterClassification } from "../entity/WorkCenterClassification";
import { WorkOrder } from "../entity/WorkOrder";
import { MaterialSheetItem } from "../entity/MaterialSheetItem";
import { AltrernativeChippers } from "../entity/AlternativeChippers";
import { MeasurmentUnits } from "../entity/MeasurmentUnits";

export class MaterialSheetController{

    public FR: FileReader = new FileReader();

    getMaterialSheets = async  (req: Request, res: Response, next: NextFunction) => {
        try {

            let list = await AppDataSource.manager.getRepository(MaterialSheet)
                                                  .createQueryBuilder("MS")
                                                  .leftJoinAndSelect("MS.fk_user_id","User")
                                                  .leftJoinAndSelect("MS.fk_warehouse_id","Warehouse")
                                                  .leftJoinAndSelect("MS.fk_work_center_id","WorkCenterClassification")
                                                  .leftJoinAndSelect("MS.fk_workorder_id","WorkOrder")
                                                  .leftJoinAndSelect("WorkOrder.fk_alternative_chiper_id","AlternativeChipers")
                                                  .leftJoinAndSelect("MS.fk_technological_units_id","TechnologicalUnits")
                                                  .getMany();
                            
            return res.status(200).json(list);

        } catch(error: Error | any) {
            return res.status(401).json({
                message: error.message
            })
        }
    }

    createMaterialSheet = async (req: Request, res: Response, next: NextFunction) => {
        try {

            let data = req.body; 

            let MS: MaterialSheet = new MaterialSheet();
            MS.id = data.fk_workorder_id;
            MS.fk_user_id = (this.FR.checkIfItemIsValid(data.fk_user_id)) ? null : data.fk_user_id as User;
            MS.fk_technological_units_id = (this.FR.checkIfItemIsValid(data.fk_technological_unit_id)) ? null: data.fk_technological_unit_id as TechnologicalUnits;
            MS.fk_warehouse_id = (this.FR.checkIfItemIsValid(data.fk_warehouse_id)) ? null: data.fk_warehouse_id as Warehouse;
            MS.fk_work_center_id = (this.FR.checkIfItemIsValid(data.fk_work_center_id)) ? null: data.fk_work_center_id as WorkCenterClassification;
            MS.fk_workorder_id = (this.FR.checkIfItemIsValid(data.fk_work_order_id)) ? null : data.fk_work_order_id as WorkOrder;
            MS.description = (this.FR.checkIfItemIsValid(data.workorder_description)) ? null: data.workorder_description; 
            MS.start_date = (this.FR.checkIfItemIsValid(data.start_date)) ? null: data.start_date;
            await AppDataSource.manager.save(MS);

            data.items.map(async (item: any) => {
                let MSI: MaterialSheetItem = new MaterialSheetItem();
                MSI.fk_material_sheet_id = MS; 
                MSI.deadline = (this.FR.checkIfItemIsValid(item.start_date)) ? null : item.start_date; 
                MSI.ammount = (this.FR.checkIfItemIsValid(item.ammount)) ? null: item.ammount; 
                MSI.fk_alternative_chiper_id = (this.FR.checkIfItemIsValid(item.fk_alternative_chiper_id)) ? null: item.fk_alternative_chiper_id as AltrernativeChippers;
                MSI.fk_mu_id = (this.FR.checkIfItemIsValid(item.fk_mu_id)) ? null: item.fk_mu_id as MeasurmentUnits;
                MSI.fk_warehouse_id = (this.FR.checkIfItemIsValid(item.fk_warehouse_id)) ? null: item.fk_warehouse_id as Warehouse; 
                
               await AppDataSource.manager.save(MSI);
            });

           return res.status(200).json({
                message: `Podatki za Materijalno listo so bili uspešno ustvarjeni !`
            })

        } catch (error: Error | any) {
            return res.status(401).json({
                message: error.message 
            })
        }
    }

    deleteMaterialSheetItem = async (req: Request, res: Response, next: NextFunction) => {
        try{
            let findMaterialSheet = await AppDataSource.manager.getRepository(MaterialSheet)
                                                                .createQueryBuilder("MS")
                                                                .where({
                                                                    id: req.params.id
                                                                })
                                                                .getOne();
                    
            if(this.FR.checkIfObjectIsEmpty(findMaterialSheet) == null)
                throw new Error(`Napaka: za iskan ID: ${req.params.id} ni bilo najdenih dobenih podatkov, ali pa ne obstajajo !`)

            let deleteItems = await AppDataSource.manager.getRepository(MaterialSheetItem)
                                                         .createQueryBuilder("MSI")
                                                         .delete()
                                                         .from(MaterialSheetItem)
                                                         .where({
                                                            fk_material_sheet_id: req.params.id
                                                         })
                                                         .execute();                                                        

            return res.status(200).json({
                message: "Podatki za izbran delovni nalog so bili uspešno izbrisani !"
            })

        } catch (error: Error | any) {
            return res.status(401).json({
                message: error.message
            })
        }
    }

    getInformation = async (req: Request, res: Response, next: NextFunction ) => {
        try{
            let info = await AppDataSource.manager.getRepository(MaterialSheet)
                                                  .createQueryBuilder("MS")
                                                  .leftJoinAndSelect("MS.fk_user_id","User")
                                                  .leftJoinAndSelect("MS.fk_warehouse_id","Warehouse")
                                                  .leftJoinAndSelect("MS.fk_work_center_id","WorkCenterClassification")
                                                  .leftJoinAndSelect("MS.fk_workorder_id","WorkOrder")
                                                  .leftJoinAndSelect("WorkOrder.fk_alternative_chiper_id","AlternativeChipers")
                                                  .leftJoinAndSelect("MS.fk_technological_units_id","TechnologicalUnits")
                                                  .where({
                                                    id: req.params.id
                                                  })
                                                  .getOne();
        
        if(this.FR.checkIfObjectIsEmpty(info) == null) 
            throw new Error(`Za iskan ID: ${req.params.id} ni bilo najdenih podatkov !!!`)

        return res.status(200).json(info);

        } catch (error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }

    getMaterialSheetItemsByID = async (req: Request, res: Response, next: NextFunction) => {
        try {

            let items = await AppDataSource.manager.getRepository(MaterialSheetItem)
                                                   .createQueryBuilder("MSI")
                                                   .leftJoinAndSelect("MSI.fk_alternative_chiper_id","AltrernativeChippers")
                                                   .leftJoinAndSelect("MSI.fk_warehouse_id","Warehouse")
                                                   .leftJoinAndSelect("MSI.fk_mu_id","MeasurmentUnits")
                                                   .leftJoinAndSelect("MSI.fk_material_sheet_id","MaterialSheet")
                                                   .where({
                                                        fk_material_sheet_id: req.params.id
                                                   })
                                                   .getMany();
                    
            return res.status(200).json(items);

        } catch (error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }

    createMaterialSheetItem = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let data = req.body; 
            
            let findSheet = await AppDataSource.manager.getRepository(MaterialSheet)
                                                        .createQueryBuilder("MS")
                                                        .where({
                                                            id: data.fk_material_sheet_id
                                                        })
                                                        .getOne();
                                
            if(this.FR.checkIfObjectIsEmpty(findSheet) == null)
                    throw new Error(`Napaka: Za iskan ID: ${data.fk_material_sheet_id} ni bilo najdenih podatkov !`)


            let Item: MaterialSheetItem = new MaterialSheetItem();
            Item.ammount = (this.FR.checkIfItemIsValid(data.ammount)) ? null: data.ammount; 
            Item.deadline = (this.FR.checkIfItemIsValid(data.start_date)) ? null: data.start_date; 
            Item.fk_alternative_chiper_id = (this.FR.checkIfItemIsValid(data.fk_alternative_chiper_id)) ? null: data.fk_alternative_chiper_id as AltrernativeChippers;
            Item.fk_material_sheet_id = findSheet;
            Item.fk_mu_id = (this.FR.checkIfItemIsValid(data.fk_mu_id)) ? null: data.fk_mu_id as MeasurmentUnits;
            Item.fk_warehouse_id = (this.FR.checkIfItemIsValid(data.fk_warehouse_id)) ? null: data.fk_warehouse_id as Warehouse;
              
            await AppDataSource.manager.save(Item);

            return res.status(200).json({
                message: `Podatki za izbran ID: ${req.params.id} so bili uspešno ustvarjeni !`
            })

        } catch(error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }
 
    setMaterialSheetUsage = async (req: Request, res: Response, next: NextFunction) => {
        try{
            let data = req.body; 
            console.log(data);

            let findSheet = await AppDataSource.manager.getRepository(MaterialSheetItem)
                                                        .createQueryBuilder("MSI")
                                                        .where({
                                                            id: data.fk_material_sheet_id.id
                                                        })
                                                        .getOne();
            
            if(this.FR.checkIfObjectIsEmpty(findSheet) == null)
                throw new Error(`Napaka: Za iskan ID: ${data.fk_material_sheet_id.id} ni bilo najdenih podatkov!`)

            let update = await AppDataSource.manager.getRepository(MaterialSheetItem)
                                                    .createQueryBuilder("MSI")
                                                    .update(MaterialSheetItem)
                                                    .set({
                                                        usage: (this.FR.checkIfItemIsValid(data.usage)) ? null: data.usage
                                                    })
                                                    .where({
                                                        id: data.fk_material_sheet_id.id
                                                    })
                                                    .execute();

            return res.status(200).json({
                message: `Podatki za količino so bili uspešno posodobljeni `
            })

        } catch (error: Error | any) {

            return res.status(401).json({
                message: error.message
            });

        }
    }

    deleteMaterialSheet = async (req: Request, res: Response, next: NextFunction) => {
        try {

            return res.status(200).json({
                messsage: `Za izbran ID: ${req.params.id} so bili uspešno izrisani podatki.`
            })

        } catch(error: Error | any) {
            return res.status(401).json({
                message: error.message
            })
        }
    }

}