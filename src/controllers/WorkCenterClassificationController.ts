import { FileReader } from "../functions/FileReader";
import { Request, Response, NextFunction, response } from 'express';
import path = require("path");
import { WorkCenterClassification } from "../entity/WorkCenterClassification";
import { AppDataSource } from "../data-source";
import { assert } from "console";


export class WorkCenterClassificationController{

    public FR: FileReader = new FileReader();

    getList =  async  (req: Request, res: Response, next: NextFunction) => {
        try {
            let list = await AppDataSource.getRepository(WorkCenterClassification)
                                          .createQueryBuilder("WCC")
                                          .leftJoinAndSelect("WCC.fk_user_id","User")
                                          .getMany();

            return res.status(200).json(list);

        } catch(error: Error |  any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }


    upload = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const filePath = path.join(process.cwd(), 'src', 'assets', 'other_data',"work_center_classification.csv");
            const records = await this.FR.readFileAndParse(filePath);

            records.map(async (item: any ) => {
               const WCC: WorkCenterClassification = new WorkCenterClassification();
               WCC.active = true; 
               WCC.created_at = new Date();
               WCC.extra_1 = (item.DODDATEK1 == undefined || item.DODDATEK1 == null || item.DODDATEK1 == '') ? null:  item.DODDATEK1;
               WCC.extra_2 = (item.DODDATEK2 == undefined || item.DODDATEK2 == null || item.DODDATEK2 == '') ? null:  item.DODDATEK2;
               WCC.extra_3 = (item.DODDATEK3 == undefined || item.DODDATEK3 == null || item.DODDATEK3 == '') ? null:  item.DODDATEK3;
               WCC.title = (item.NAZIV == undefined || item.NAZIV == null || item.NAZIV == '') ? null: this.FR.convertToSlovenian(item.NAZIV);
               WCC.group_type = (item.TIP_SKUP == undefined || item.TIP_SKUP == null || item.TIP_SKUP == '') ? null: item.TIP_SKUP;
               WCC.group_id = (item.ID_SKUP == undefined || item.ID_SKUP == null || item.ID_SKUP == '')? null: item.ID_SKUP;
               WCC.idg = (item.IDG == undefined || item.IDG == null || item.IDG == '') ? null: item.IDG;
               WCC.status = (item.STATUS == undefined || item.STATUS == null || item.STATUS == '') ? null : item.STATUS;
              

               await AppDataSource.manager.save(WCC);
            
            });

            return res.status(200).json({
                message: "Podatki za Klasifikacijo Delovnih Centro so bili uspešno uvoženi !"
            })

        } catch (error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }



}