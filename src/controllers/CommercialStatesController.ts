import path = require("path");
import { AppDataSource } from "../data-source";
import { Country } from "../entity/Country";
import { ZipCode } from "../entity/ZipCode";
import * as  fs from 'fs';
import {parse} from 'csv-parse';
import { MeasureMemoryMode } from "vm";
import { MeasurmentUnits } from "../entity/MeasurmentUnits";
import { GroupType } from "../entity/GroupType";
import { Request, Response, NextFunction, response } from 'express';
import { FileReader } from "../functions/FileReader";
import { CommercialStates } from "../entity/CommercialStates";

enum CommercialStatesTypes {
    BK = "debit_notes",
    OK = "credits",
    FK = "fakturing",
    FT = "fakturing_country",
    ND = "suppliers_orders",
    NK = "costumer_orders",
    PO = "offers",
    PR = "estimates",
    XX = "general_statments"
}


export class CommercialStatesController{
    
    public FR: FileReader = new FileReader();

    get = async (req:Request, res: Response, next: NextFunction) => {

    }

    getByType = async (req: Request, res: Response, next: NextFunction) => {
        try {
             //console.log( req.params.type);
            let list = await AppDataSource.getRepository(CommercialStates)
                                           .createQueryBuilder("CS")
                                           .leftJoinAndSelect("CS.fk_user_id","User")
                                           .where({
                                                type: req.params.type
                                           })
                                           .getMany();
            
            return res.status(200).json(list);


        } catch(error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
 

    }

    deleteByID = async (req:Request, res: Response, next: NextFunction) => {
        try {
            let deleteObject = await AppDataSource.createQueryBuilder()
                                                  .delete()
                                                  .from(CommercialStates)
                                                  .where({
                                                    id: req.params.id
                                                  })
                                                  .execute();
            let error_message: string = '';

            if (deleteObject.raw === undefined) {
                throw new Error(`"Napaka: Pri brisanju objekta je prišlo do napake."`)
            } else if (deleteObject.affected && deleteObject.affected > 0) {
                error_message = `Izbran objekt pod IDjem: ${req.params.id} je bil uspešno izbrisan !`
            } else {
                throw new Error(`Napaka: Iskan objekt z IDjem: ${req.params.id} ni bil najden !`)
            }                                                


            return res.status(200).json({
                message: error_message
            });

        } catch(error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }

    deleteMany = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const selected_type = req.params.type;
            let deleteData = await AppDataSource.createQueryBuilder()
                                              .delete()
                                              .from(CommercialStates)
                                              .where({
                                                type: selected_type
                                              })
                                              .execute();
            console.log(selected_type);

            return res.status(200).json({
                message: "Podatki za Izjave za komercijalo so bili uspešno izbrisani."
            })

        }catch(error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }

    upload = async  (req: Request, res: Response, next: NextFunction) => {
        try {
            const filePath = path.join(process.cwd(), 'src', 'assets', 'other_data', "fakturing.csv");
            const records = await this.FR.readFileAndParse(filePath);

            records.map(async (item: any) => {
                
                const  det_item_type: CommercialStatesTypes = CommercialStatesTypes[item.TIP as keyof typeof CommercialStatesTypes];
                let CS: CommercialStates = new CommercialStates();
                CS.active = true;
                CS.created_at = new Date();
                CS.description = (item.VSEBINA == undefined || item.VSEBINA == null || item.VSEBINA == '') ? null : this.FR.convertToSlovenian(item.VSEBINA);
                CS.title = (item.NAZIV == undefined || item.NAZIV == null || item.NAZIV == '') ? null :  this.FR.convertToSlovenian(item.NAZIV);
                CS.status = (item.STATUS == undefined || item.STATUS == null || item.STATUS == '') ? null : item.STATUS;
                CS.type = det_item_type;

                //console.log(CS);

                await AppDataSource.manager.save(CS);

            })

            return res.status(200).json({
                message: "Podatki za Izjave so bili uspešno shranjeni !"
            });


        } catch(error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }


}
