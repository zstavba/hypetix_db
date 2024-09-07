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
import { WorkProcedures } from "../entity/WorkProcedures";
import { Classification } from "../entity/Classification";
import { WorkSheet } from "../entity/WorkSheet";
import { AltrernativeChippers } from "../entity/AlternativeChippers";
import { TechnologicalUnits } from "../entity/TechnologicalUnits";
import { WorkCenterClassification } from "../entity/WorkCenterClassification";
import { WorkOrder } from "../entity/WorkOrder";
import { WorkSheetItem } from "../entity/WorkSheetItem";
import { AlternativeChipersController } from "./AlternativeChipersController";
import { ArticleType } from "../entity/ArticleType";
import { User } from "../entity/User";

export class WorkSheetController{

    public FR: FileReader = new FileReader();

    getWorkSheets = async (req: Request, res: Response, next: NextFunction) => {
        try {

            let list = await AppDataSource.manager.getRepository(WorkSheet)
                                                  .createQueryBuilder("WS")
                                                  .leftJoinAndSelect("WS.fk_workorder_id","WorkOrder")
                                                  .leftJoinAndSelect("WorkOrder.fk_alternative_chiper_id","AltrernativeChippers")
                                                  .leftJoinAndSelect("WS.fk_alternative_chiper_id","AltrernativeChippers1")
                                                  .leftJoinAndSelect("WS.fk_technological_unit_id","TechnologicalUnits")
                                                  .leftJoinAndSelect("WS.fk_work_center_id","WorkCenterClassification")
                                                  .leftJoinAndSelect("WS.fk_mu_id","MeasurmentUnits")
                                                  .leftJoinAndSelect("WS.fk_user_id","User")
                                                  .getMany();

            return res.status(200).json(list)

        } catch (error: Error | any) {
            return res.status(401).json({
                message: error.message
            })
        }
    }

    getWorkSheetInformation = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let info  =  await AppDataSource.manager.getRepository(WorkSheet)
                                                    .createQueryBuilder("WS")
                                                    .leftJoinAndSelect("WS.fk_workorder_id","WorkOrder")
                                                    .leftJoinAndSelect("WorkOrder.fk_alternative_chiper_id","AltrernativeChippers")
                                                    .leftJoinAndSelect("WS.fk_alternative_chiper_id","AltrernativeChippers1")
                                                    .leftJoinAndSelect("WS.fk_technological_unit_id","TechnologicalUnits")
                                                    .leftJoinAndSelect("WS.fk_work_center_id","WorkCenterClassification")
                                                    .leftJoinAndSelect("WS.fk_mu_id","MeasurmentUnits")
                                                    .leftJoinAndSelect("WS.fk_user_id","User")
                                                    .where({
                                                        id: req.params.id
                                                    })
                                                    .getOne();
            
            if(this.FR.checkIfObjectIsEmpty(info) == null) 
                throw new Error(`Napaka: za iskan DN: ${req.params.id} ni bilo najdenih podatkov !`);
        
            return res.status(200).json(info);


        } catch(error: Error | any) {
            return res.status(401).json({
                message: error.message
            })
        }

    }

    createWorkSheet  = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let data = req.body; 
            //console.log(data.sheet_items);
            let WS: WorkSheet = new WorkSheet();
            WS.ammount = (this.FR.checkIfItemIsValid(data.ammount)) ? null: data.ammount; 
            WS.fk_alternative_chiper_id = (this.FR.checkIfItemIsValid(data.fk_alternative_chiper_id)) ? null : data.fk_alternative_chiper_id as AltrernativeChippers;
            WS.fk_mu_id = (this.FR.checkIfItemIsValid(data.fk_meassurement_unit_id)) ? null : data.fk_meassurement_unit_id as MeasurmentUnits;
            WS.fk_technological_unit_id = (this.FR.checkIfItemIsValid(data.fk_technological_unit_id)) ? null: data.fk_technological_unit_id as TechnologicalUnits;
            WS.fk_work_center_id = (this.FR.checkIfItemIsValid(data.fk_work_center_id)) ? null: data.fk_work_center_id as WorkCenterClassification;
            WS.fk_workorder_id = (this.FR.checkIfItemIsValid(data.fk_workorder_id)) ? null: data.fk_workorder_id as WorkOrder;
            WS.start_date = (this.FR.checkIfItemIsValid(data.start_date)) ? null : data.start_date;

            await AppDataSource.manager.save(WS);
            
          data.sheet_items.map(async (item : any) => {   
            let WSI: WorkSheetItem = new WorkSheetItem();
            WSI.ammount = (this.FR.checkIfItemIsValid(item.ammount)) ? null : item.ammount; 
            WSI.fk_alternative_chiper_id = (this.FR.checkIfItemIsValid(item.fk_alternative_chiper_id)) ? null : item.fk_alternative_chiper_id as AltrernativeChippers;
            WSI.fk_article_type_id = (this.FR.checkIfItemIsValid(item.fk_article_type_id)) ? null : item.fk_article_type_id as ArticleType;
            WSI.fk_mu_id = (this.FR.checkIfItemIsValid(item.fk_mu_id)) ? null : item.fk_mu_id as MeasurmentUnits; 
            WSI.fk_work_sheet_id = WS;
            await AppDataSource.manager.save(WSI);    
        })

            return res.status(200).json({
                message: `Podatki za delovni nalog: ${data.fk_workorder_id.id} so bili uspešno ustvarjeni !`
            })

        } catch (error: Error | any) {
            return res.status(401).json({
                message: error.message
            })
        }
    }

    getItemsById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let list = await AppDataSource.manager.getRepository(WorkSheetItem)
                                                  .createQueryBuilder("WSI")
                                                  .leftJoinAndSelect("WSI.fk_work_sheet_id","WorkSheet")
                                                  .leftJoinAndSelect("WSI.fk_alternative_chiper_id","AltrernativeChippers")
                                                  .leftJoinAndSelect("WSI.fk_mu_id","MeasurmentUnits")
                                                  .leftJoinAndSelect("WSI.fk_article_type_id","ArticleTyoe")
                                                  .where({
                                                    fk_work_sheet_id: req.params.id
                                                  })
                                                  .getMany();
            
            return res.status(200).json(list);

        } catch(error: Error | any) {
            return res.status(401).json({
                message: error.message
            })
        }
    }

    deleteWorkSheetItem = async (req: Request, res: Response, next: NextFunction) => {
        try {

            let deleteItem = await AppDataSource.manager.getRepository(WorkSheetItem)
                                                        .createQueryBuilder("WSI")
                                                        .delete()
                                                        .from(WorkSheetItem)
                                                        .where({
                                                            id: req.params.id
                                                        })
                                                        .execute();

            return res.status(200).json({
                message: `Artikelj je bil uspešno izbrisan iz delovnega lista !`
            });

        } catch(error: Error | any) {
            return res.status(200).json({
                message: error.message
            });
        }
    }

    createWorkSHeetItem = async (req: Request, res: Response, next: NextFunction) => {
        try {
            
            let data = req.body; 

            let findWorkSheeet = await AppDataSource.manager.getRepository(WorkSheet)
                                                            .createQueryBuilder("WS")
                                                            .where({
                                                                id: data.fk_work_sheet_id
                                                            })
                                                            .getOne();
            
            if(this.FR.checkIfObjectIsEmpty(findWorkSheeet) == null) 
                throw new Error(`Napaka: ID: ${data.fk_work_sheet_id} za delovni list ni bil najden`);
        
            let Item: WorkSheetItem = new WorkSheetItem();
            Item.fk_alternative_chiper_id = (this.FR.checkIfItemIsValid(data.fk_ac_id)) ? null: data.fk_ac_id as AltrernativeChippers;
            Item.fk_article_type_id = (this.FR.checkIfItemIsValid(data.fk_article_type_id)) ? null: data.fk_article_type_id as ArticleType;
            Item.fk_mu_id = (this.FR.checkIfItemIsValid(data.fk_mu_id)) ? null: data.fk_mu_id as MeasurmentUnits;
            Item.fk_work_sheet_id = findWorkSheeet;
            Item.ammount = (this.FR.checkIfItemIsValid(data.work_sheet_item_ammount)) ? null: data.work_sheet_item_ammount; 
            Item.fk_user_id = (this.FR.checkIfItemIsValid(data.fk_user_id)) ? null: data.fk_user_id as User;
            
            await AppDataSource.manager.save(Item);
            

            return res.status(200).json({
                message: `Artikelj za delovni list je bil uspešno dodan !`
            })

        } catch (error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }

    updateSelectedItem = async (req: Request, res: Response, next: NextFunction) => {
        try {

            let findItem = await AppDataSource.manager.getRepository(WorkSheetItem)
                                                      .createQueryBuilder("WSI")
                                                      .where({
                                                        id: req.params.id
                                                      })
                                                      .getOne();
            let data = req.body; 
            console.log(data);

            if(this.FR.checkIfObjectIsEmpty(findItem) == null)
                throw new Error(`Napaka za iskan ID: ${req.params.id} ni bilo najdenih dobenih podatkov`);

            let update = await AppDataSource.manager.getRepository(WorkSheetItem)
                                                    .createQueryBuilder("WSI")
                                                    .update(WorkSheetItem)
                                                    .set({
                                                        ammount: req.body.work_sheet_item_ammount
                                                    })
                                                    .where({
                                                        id: req.params.id
                                                    })
                                                    .execute();


            return res.status(200).json({
                message: `Podatek z IDjem: ${req.params.id} je bil uspešno posodobljen za delovni list.`
            })

        } catch (error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }

    updateWorkSheet = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let data = req.body; 

            let findWorkSheeet = await AppDataSource.manager.getRepository(WorkSheet)
                                                            .createQueryBuilder("WS")
                                                            .where({
                                                                id: req.params.id
                                                            })
                                                            .getOne();
                
            if(this.FR.checkIfObjectIsEmpty(findWorkSheeet) == null)
                throw new Error(`Napaka: Iskan ID: ${req.params.id} za delovni list, ni bil najden ali pa ne obstaja !`);

            let update = await AppDataSource.manager.getRepository(WorkSheet)
                                                    .createQueryBuilder("WS")
                                                    .update(WorkSheet)
                                                    .set({
                                                        fk_work_center_id: (this.FR.checkIfItemIsValid(data.fk_work_center_id)) ? null : data.fk_work_center_id as WorkCenterClassification,
                                                        fk_alternative_chiper_id: (this.FR.checkIfItemIsValid(data.fk_alternative_chipper_id)) ? null: data.fk_alternative_chipper_id as AltrernativeChippers,
                                                        fk_technological_unit_id: (this.FR.checkIfItemIsValid(data.fk_technological_unit_id)) ? null: data.fk_technological_unit_id as TechnologicalUnits,
                                                        fk_mu_id: (this.FR.checkIfItemIsValid(data.fk_mu_id)) ? null : data.fk_mu_id as MeasurmentUnits,
                                                        ammount: (this.FR.checkIfItemIsValid(data.ammount)) ? null : data.ammount 
                                                    })
                                                    .where({
                                                        id: req.params.id
                                                    })
                                                    .execute();
            
            return res.status(200).json({
                message: `Podatki za izbran ID: ${req.params.id} so bili uspešno shranjeni !`
            })

        } catch (error: Error| any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }

    deleteWorkSheet = async (req: Request, res: Response, next: NextFunction) => {
        try {

            let findWorkSheet = await AppDataSource.manager.getRepository(WorkSheet)
                                                           .createQueryBuilder("WS")
                                                           .where({
                                                            id: req.params.id
                                                           })
                                                           .getOne();
                            
            if(this.FR.checkIfObjectIsEmpty(findWorkSheet) == null)
                throw new Error(`Napaka za iskan ID: ${req.params.id} ni bilo najdenih dobenih podatkov, ali pa ne obstajajo !`);

            let deleteItems = await AppDataSource.manager.getRepository(WorkSheetItem)
                                                          .createQueryBuilder("WSI")
                                                          .delete()
                                                          .from(WorkSheetItem)
                                                          .where({
                                                            fk_work_sheet_id: req.params.id
                                                          })
                                                          .execute();
            
            let deleteWorkSheet = await AppDataSource.manager.getRepository(WorkSheet)
                                                             .createQueryBuilder("WS")
                                                             .delete()
                                                             .from(WorkSheet)
                                                             .where({
                                                                id: req.params.id
                                                             })
                                                             .execute()


            return res.status(200).json({
                message: `Podatki za izbran ID: ${req.params.id} so bili uspešno izbrisani !`
            })

        } catch (error: Error | any) {
            return res.status(401).json({
                message: error.message
            })
        }
    }

}