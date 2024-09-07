import path = require("path");
import { AppDataSource } from "../data-source";
import * as  fs from 'fs';
import {parse} from 'csv-parse';
import { NextFunction, Request, Response } from "express";
import { FileReader } from "../functions/FileReader";
import { TechnologicalProcesses } from "../entity/TechnologicalProcesses";
import { TechnologicalUnits } from "../entity/TechnologicalUnits";
import { Classification } from "../entity/Classification";
import { Traitor } from "../entity/Traitor";
import { User } from "../entity/User";
import { WorkOrder } from "../entity/WorkOrder";
import { Warehouse } from "../entity/Warehouse";
import { WorkCenterClassification } from "../entity/WorkCenterClassification";
import { TrafficType } from "../entity/TrafficType";
import { Shipping } from "../entity/Shipping";
import { MeasurmentUnits } from "../entity/MeasurmentUnits";
import { TraitorItem } from "../entity/TraitorItem";
import { AltrernativeChippers } from "../entity/AlternativeChippers";
import { WarehouseFabricSaved } from "../entity/WarehouseFabricSaved";

export class TraitorController{

    public FR: FileReader = new FileReader();

    get = async (req: Request, res: Response, next: NextFunction) => {
        try {

            let list = await AppDataSource.manager.getRepository(Traitor)
                                                  .createQueryBuilder("T")
                                                  .leftJoinAndSelect("T.fk_user_id", "User")
                                                  .leftJoinAndSelect("T.fk_workorder_id", "WorkOrder")
                                                  .leftJoinAndSelect("WorkOrder.fk_alternative_chiper_id","AlternativeChippers")
                                                  .leftJoinAndSelect("T.fk_warehouse_id", "Warehouse")
                                                  .leftJoinAndSelect("T.fk_technological_units_id", "TechnologicalUnits")
                                                  .leftJoinAndSelect("T.fk_work_center_id", "WorkCenterClassification")
                                                  .leftJoinAndSelect("T.fk_traffic_type_id", "TrafficType")
                                                  .leftJoinAndSelect("T.fk_mu_id","MeasurmentUnits")
                                                  .leftJoinAndSelect("T.fk_alternative_chiper_id","AlternativeChippers1")
                                                  .getMany();
          
            return res.status(200).json(list)


        } catch(error : Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }


    getInformation = async (req: Request, res: Response, next: NextFunction) => {
        try {

            let info =  await AppDataSource.manager.getRepository(Traitor)
                                                   .createQueryBuilder("T")
                                                   .leftJoinAndSelect("T.fk_user_id", "User")
                                                   .leftJoinAndSelect("T.fk_workorder_id", "WorkOrder")
                                                   .leftJoinAndSelect("WorkOrder.fk_alternative_chiper_id","AlternativeChippers")
                                                   .leftJoinAndSelect("T.fk_warehouse_id", "Warehouse")
                                                   .leftJoinAndSelect("T.fk_technological_units_id", "TechnologicalUnits")
                                                   .leftJoinAndSelect("T.fk_work_center_id", "WorkCenterClassification")
                                                   .leftJoinAndSelect("T.fk_traffic_type_id", "TrafficType")
                                                   .leftJoinAndSelect("T.fk_mu_id","MeasurmentUnits")
                                                   .where({
                                                    id: req.params.id
                                                   })
                                                   .getOne();

            if(this.FR.checkIfObjectIsEmpty(info) == null)
                throw new Error(`Napaka: Iskan ID: ${req.params.id} ni bil najden ali pa ne obsjataj`)

            return res.status(200).json(info);

        } catch(error: Error | any) {
            return res.status(401).json({
                message: error.message
            })
        }
    }

    createTraitor = async (req: Request, res: Response, next: NextFunction) => {
        try {

            let data = req.body; 

            let T: Traitor = new Traitor();
            T.id = (this.FR.checkIfItemIsValid(data.traitor_id)) ? null :  data.traitor_id;
            T.fk_user_id = (this.FR.checkIfItemIsValid(data.fk_user_id)) ? null: data.fk_user_id as User;
            T.fk_workorder_id = (this.FR.checkIfItemIsValid(data.fk_workorder_id)) ? null : data.fk_workorder_id as WorkOrder;
            T.fk_warehouse_id = (this.FR.checkIfItemIsValid(data.fk_warehouse_id)) ? null: data.fk_warehouse_id as Warehouse;
            T.fk_technological_units_id = (this.FR.checkIfItemIsValid(data.fk_technological_units_id)) ? null : data.fk_technological_units_id as TechnologicalUnits;
            T.fk_work_center_id = (this.FR.checkIfItemIsValid(data.fk_work_center_id)) ? null :  data.fk_work_center_id as WorkCenterClassification;
            T.fk_traffic_type_id = (this.FR.checkIfItemIsValid(data.fk_traffic_type_id)) ? null :  data.fk_traffic_type_id as TrafficType;
            T.fk_shipping_method_id = (this.FR.checkIfItemIsValid(data.fk_shipping_method_id)) ? null: data.fk_shipping_method_id as Shipping;
            T.start_date = (this.FR.checkIfItemIsValid(data.traitor_start_date)) ? null : data.traitor_start_date;
            T.fk_mu_id = (this.FR.checkIfItemIsValid(data.fk_measurement_unit_id)) ? null :  data.fk_measurement_unit_id as MeasurmentUnits;
            T.ammount = (this.FR.checkIfItemIsValid(data.traitor_ammount)) ? null : data.traitor_ammount;
            T.fk_alternative_chiper_id = (this.FR.checkIfItemIsValid(data.fk_alternative_chiper_id)) ? null: data.fk_alternative_chiper_id as AltrernativeChippers;
            await AppDataSource.manager.save(T);

            data.traitor_items.map( async (item: any) => {
                let TTI: TraitorItem = new TraitorItem();
                TTI.fk_workorder_id = (this.FR.checkIfItemIsValid(item.fk_workorder_id)) ? null : item.fk_workorder_id; 
                TTI.fk_warehouse_id = (this.FR.checkIfItemIsValid(item.fk_warehouse_id)) ? null: item.fk_warehouse_id as Warehouse;
                TTI.fk_alternative_chipper_id = (this.FR.checkIfItemIsValid(item.fk_alternative_chipper_id)) ? null : item.fk_alternative_chipper_id as AltrernativeChippers;
                TTI.fk_mu_id = (this.FR.checkIfItemIsValid(item.fk_mu_id)) ? null: item.fk_mu_id as MeasurmentUnits;
                TTI.selected_ammount = (this.FR.checkIfItemIsValid(item.selected_ammount)) ? null: item.selected_ammount;
                TTI.fk_selected_workorder_id = (this.FR.checkIfItemIsValid(item.fk_selected_workorder_id)) ? null : item.fk_selected_workorder_id as WorkOrder;
                TTI.has_sub_order = (this.FR.checkIfItemIsValid(item.has_sub_order)) ? null : item.has_sub_order;

                await AppDataSource.manager.save(TTI);
            });

          
            

            return res.status(200).json({
                message: "Podatki za Izdajnico so bili uspešno ustvarjeni !"
            })

        } catch(error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }

    deleteTraitor = async (req: Request, res: Response, next: NextFunction) => {
        try {

            let deleteItem = await AppDataSource.manager.getRepository(Traitor)
                                                    .createQueryBuilder("T")
                                                    .delete()
                                                    .from(Traitor)
                                                    .where({
                                                        id: req.params.id
                                                    })
                                                    .execute();


            return res.status(200).json({
                message: `Podatki za izbran delovni nalog pod IDjem: ${req.params.id} so bili uspešno izbrisani !`
            })

        } catch(error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }

    closeTraitor = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let close = await AppDataSource.manager.getRepository(Traitor)
                                                   .createQueryBuilder("T")
                                                   .update({
                                                        open: false
                                                   })
                                                   .where({
                                                        id: req.params.id
                                                   })
                                                   .execute();
        
            return res.status(200).json({
                message: `Za izbran ID: ${req.params.id} je bil delovni nalog uspešno zaprt !`
            })


        } catch(error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }


    openTraitor = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let close = await AppDataSource.manager.getRepository(Traitor)
                                                   .createQueryBuilder("T")
                                                   .update({
                                                        open: true
                                                   })
                                                   .where({
                                                        id: req.params.id
                                                   })
                                                   .execute();
        
            return res.status(200).json({
                message: `Za izbran ID: ${req.params.id} je bil delovni nalog uspešno odprt !`
            })


        } catch(error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }

    getItemsByID = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let items = await AppDataSource.manager.getRepository(TraitorItem)
                                                   .createQueryBuilder("TI")
                                                   .leftJoinAndSelect("TI.fk_alternative_chipper_id","AlternaticeChippers")
                                                   .leftJoinAndSelect("TI.fk_mu_id","MeasurmentUnits")
                                                   .leftJoinAndSelect("TI.fk_selected_workorder_id","WorkOrder")
                                                   .leftJoinAndSelect("TI.fk_warehouse_id","Warehouse")
                                                   .where({
                                                    fk_workorder_id:  req.params.id
                                                   })
                                                   .getMany();


            return res.status(200).json(items);


        } catch(error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }

    saveFabricData = async (req: Request, res: Response, next: NextFunction) => {
        try {

            let data = req.body; 
            let findSavedFabric = await AppDataSource.manager.getRepository(WarehouseFabricSaved)
                                                             .createQueryBuilder("WFS")
                                                             .leftJoinAndSelect("WFS.fk_traitor_item_id","TraitorItem")
                                                             .where({
                                                                fk_traitor_item_id: data.traitor_item.id
                                                             })
                                                             .getOne();
            
            if(this.FR.checkIfObjectIsEmpty(findSavedFabric) == null) {
                let saved_fabric: WarehouseFabricSaved = new WarehouseFabricSaved();
                saved_fabric.fk_traitor_item_id = (this.FR.checkIfItemIsValid(data.traitor_item)) ? null: data.traitor_item as TraitorItem
                saved_fabric.used_ammount = (this.FR.checkIfItemIsValid(data.used_ammount)) ? null: data.used_ammount;
                saved_fabric.saved = true; 
                await AppDataSource.manager.save(saved_fabric);
            }else{
                let update = await AppDataSource.manager.getRepository(WarehouseFabricSaved)
                                                        .createQueryBuilder("WFS")
                                                        .update(WarehouseFabricSaved)
                                                        .set({
                                                            used_ammount: data.used_ammount
                                                        })
                                                        .where({
                                                            fk_traitor_item_id: data.traitor_item.id
                                                        })
                                                        .execute();
            }



            return res.status(200).json({
                message: `Podatki za Izdajnico: ${req.params.id} so bili uspešno shranjeni !`
            })

        } catch(error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }

    getSavedFabric = async (req: Request, res: Response, next: NextFunction) => {
        try  {
            let list = await AppDataSource.manager.getRepository(WarehouseFabricSaved)
                                                  .createQueryBuilder("WFS")
                                                  .leftJoinAndSelect("WFS.fk_traitor_item_id","TraitorItem")
                                                  .leftJoinAndSelect("TraitorItem.fk_selected_workorder_id","WorkOrder")
                                                  .leftJoinAndSelect("TraitorItem.fk_alternative_chipper_id","AlternativeChippers")
                                                  .leftJoinAndSelect("TraitorItem.fk_mu_id","MeasurmentUnits")
                                                  .getMany();


            return res.status(200).json(list);



        } catch(error: Error | any) {
            return res.status(401).jsonp({
                message: error.message
            })
        }
    }

}