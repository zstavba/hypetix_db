import path = require("path");
import { AppDataSource } from "../data-source"
import { Country } from "../entity/Country";
import { ShoppingPlaces } from "../entity/ShoppingPlaces"
import { ZipCode } from "../entity/ZipCode";
import * as  fs from 'fs';
import {parse} from 'csv-parse';

export class ShoppingPlacesController {


    checkIfObjectIsEmpty = (object: Object | any): undefined => {
        if(object === undefined || object === null){
            return undefined;
        }else if(object.length === 0){
            return undefined;
        }else{
            return object;
        }
    }


    getShoppingPlaces = async (req:any, res:any, next:any) => {
        try {
            let getSPList = await AppDataSource.getRepository(ShoppingPlaces)
                                               .createQueryBuilder('SP')
                                               .leftJoinAndSelect('SP.fk_country_id',"Country")
                                               .leftJoinAndSelect('SP.fk_zip_code_id',"ZipCode")
                                               .getMany();

            return res.status(200).json(getSPList);
            
        } catch(error : Error | any) {
            return res.status(401).json({
                message: error.message
            })
        }


    }

    postShoppingPlace = async (req:any, res:any, next:any) => {
        try {
            const data = req.body;

            let SP = new ShoppingPlaces();
            SP.company_name = data.shopping_company_name;
            SP.company_addres = data.shopping_company_address;
            SP.fk_country_id = data.shopping_place_country as Country;
            SP.fk_zip_code_id = data.shopping_place_zip_code as ZipCode;
            SP.phone_number = data.shopping_company_phone_number; 

            await AppDataSource.manager.save(SP);

            return res.status(200).json({
                message: "Novo podjetje je bilo uspešno oddano"
            })

        } catch(error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }

    deleteShoppingPlace =  async (req:any, res:any ,next: any) => {
        try {
            const data = req.params.id;
            
            let findData = await AppDataSource.manager.findBy(ShoppingPlaces,{
                id: data
            });

            if(this.checkIfObjectIsEmpty(findData) == null)
                throw new Error("Napaka: Iskano podjetje žal ni bilo najdeno, ali pa ni vnešeno v podatkovno bazo.");

            await AppDataSource.createQueryBuilder()
                               .delete()
                               .from(ShoppingPlaces)
                               .where('id = :id',{
                                id: data
                               })
                               .execute();

            return res.status(200).json({
                message: "Izbrano podjetje je bilo uspešno izbrisano !"
            })
        } catch(error: Error | any){
            return res.status(401).json({
                message: error.message
            });
        }
    }

    uploadShoppingPlaceFile = async (req:any, res:any, next:any) => {

        try{
            const files  = req.file;

            const filePath = path.join(process.cwd(), 'src', 'assets', 'uploads', files.filename);
            const fileData = fs.readFileSync(filePath, 'utf8');
            const records = await new Promise<any[]>((resolve, reject) => {
                parse(fileData, { columns: true, encoding: "utf8" }, (err, data) => {
                  if (err) reject(err);
                  else resolve(data);
                });
            });

           if(records.length <= 0)
                throw new Error('Napaka: Seznam datoteke je prazen');

            
            records.map( async (item: any | Object) => {
                let SP: ShoppingPlaces = new ShoppingPlaces();
                SP.company_name = (item.title == null || item.title == undefined) ? null : item.title;
                SP.company_addres = (item.adress == null || item.adress == undefined) ? null : item.adress;
                let findZipCode = await AppDataSource.manager.findBy(ZipCode,{
                    attribute: item.zipcode
                });
                
                SP.fk_zip_code_id = (this.checkIfObjectIsEmpty(findZipCode[0]) == null) ? null: findZipCode[0];

                let findCountry = await AppDataSource.manager.findBy(Country,{
                    name: item.country
                });

                SP.fk_country_id = (this.checkIfObjectIsEmpty(findCountry[0]) == null) ? null :  findCountry[0]; 
                
               await AppDataSource.manager.save(SP);

            });

            return res.status(200).json({
                message: "Podatki iz datoteke so bili uspešno uvozeni !"
            });


        } catch(error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }

    }

    update_shopping_place = async (req:any ,res:any, next: any) => {
        try {
            const data = req.body;

            
            let update = await AppDataSource.createQueryBuilder()
                                            .update(ShoppingPlaces)
                                            .set({
                                                company_name: data.shopping_company_name,
                                                company_addres: data.shopping_company_address,
                                                fk_zip_code_id: data.shopping_company_zipcode as ZipCode,
                                                fk_country_id: data.shopping_company_country as Country,
                                                phone_number: data.shopping_company_phone_number
                                            })
                                            .where("company_name = :name", {
                                                name: data.shopping_company_name
                                            })
                                            .execute();          


            return res.status(200).json({
                message: "Podatki za izbrano podjetje so bili uspešno posodoboljeni."
            })

        } catch(error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }

}