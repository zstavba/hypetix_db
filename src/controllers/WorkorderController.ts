import { FileReader } from "../functions/FileReader";
import { Request, Response, NextFunction, response } from 'express';
import path = require("path");
import { WorkCenterClassification } from "../entity/WorkCenterClassification";
import { AppDataSource } from "../data-source";
import { assert } from "console";
import { WorkOrder } from "../entity/WorkOrder";
import { Warehouse } from "../entity/Warehouse";
import { AltrernativeChippers } from "../entity/AlternativeChippers";
import { User } from "../entity/User";


export class WorkOrderController{

    public FR: FileReader = new FileReader();

    getWorkorder = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let list = await AppDataSource.getRepository(WorkOrder)
                                          .createQueryBuilder("WO")
                                          .leftJoinAndSelect("WO.fk_user_id","User")
                                          .leftJoinAndSelect("WO.fk_warehouse_id","Warehouse")
                                          .leftJoinAndSelect("WO.fk_partner_id","User1")
                                          .leftJoinAndSelect("WO.fk_alternative_chiper_id","AlternativeChippers")
                                          .getMany();
            
            return res.status(200).json(list);

        } catch(error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }

    createWorkorder = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body;
            const WO: WorkOrder = new WorkOrder();
            WO.id = (this.FR.checkIfItemIsValid(data.workorder_id)) ? null: data.workorder_id;
            WO.fk_warehouse_id = (this.FR.checkIfObjectIsEmpty(data.fk_warehouse_id) == null) ? null: data.fk_warehouse_id as Warehouse;
            WO.fk_alternative_chiper_id = (this.FR.checkIfObjectIsEmpty(data.wokrorder_alternative_chiper) == null) ? null :  data.wokrorder_alternative_chiper as AltrernativeChippers;
            WO.fk_partner_id = (this.FR.checkIfObjectIsEmpty(data.fk_user_id) == null) ? null :  data.fk_user_id as User;
            WO.article_ammount = (this.FR.checkIfItemIsValid(data.wokroder_article_ammount)) ? null: data.wokroder_article_ammount;
            WO.article_description = (this.FR.checkIfItemIsValid(data.workorder_description)) ? null : data.workorder_description;
            WO.article_length = (this.FR.checkIfItemIsValid(data.wokroder_article_length)) ? null: data.wokroder_article_length;
            WO.article_square_meters = (this.FR.checkIfItemIsValid(data.wokroder_article_sqare_meters)) ? null : data.wokroder_article_sqare_meters;
            WO.article_width = (this.FR.checkIfItemIsValid(data.wokroder_article_width)) ? null: data.wokroder_article_width;
            WO.shipent_date = (this.FR.checkIfItemIsValid(data.workorder_shipment_date)) ? null: data.workorder_shipment_date;
            WO.start_date = (this.FR.checkIfItemIsValid(data.workorder_start_date)) ? null : data.workorder_start_date;

            await AppDataSource.manager.save(WO);

            return res.status(200).json({
                message: "Podatki so bili uspešno ustvarjeni !"
            })

        } catch(error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }

}