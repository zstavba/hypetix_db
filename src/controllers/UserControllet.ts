import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import * as bcrypt from 'bcrypt';
import path = require("path");
import { FileReader } from "../functions/FileReader";
import { ZipCode } from "../entity/ZipCode";
import { Country } from "../entity/Country";

export class UserController {

    public FR: FileReader = new FileReader();

    getInformation =  async (req: any, res:any, next: any) => {
        try {
            let findUser = await AppDataSource.manager.findBy(User,{
                id: req.params.id
            });

            if(this.FR.checkIfObjectIsEmpty(findUser) == null)
                throw new Error(`Napaka: iskanega uporabnika pod ID: ${req.params.id} ni bilo možno najti !`)

            return res.status(200).json(findUser);

        } catch(error: Error | any){
            return res.status(401).json({
                message: error.message
            });
        }

    }

    getUserByType = async (req: Request, res: Response, next: NextFunction) => {
        try {
            
            let list = await AppDataSource.getRepository(User)
                                          .createQueryBuilder("User")
                                          .where({
                                            user_type: req.params.type
                                          })
                                          .getMany();
            
            if(this.FR.checkIfArrayIsEmpty(list) == undefined)
                throw new Error(`Napaka: Iskan tip uporabnika ni bil najden.`)

            return res.status(200).json(list)

        } catch(error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }

    loginUser = async (req:any, res:any, next:any) => {
        try {
            let data = req.body;
            const saltRounds = 10;
            let bcryptPassword = await bcrypt.hash(data.password, saltRounds);
            
            let foundUser = await AppDataSource.manager.findBy(User, { username: data.username });

            if (!foundUser) {
                throw new Error("Error: User not found");
            }
            
            let foundUserIndex = foundUser.findIndex(u => bcrypt.compareSync(data.password, u.password));

            if (foundUserIndex === -1) {
                throw new Error("Napaka: Vneseno geslo je napačno !");
            }

            req.session.user = foundUser[0];

            return res.status(200).json(JSON.stringify(foundUser[0]));
        } catch(error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }


    getList = async (req:Request, res: Response, next: NextFunction) => {
        try {
            let list = await AppDataSource.getRepository(User)
                                           .createQueryBuilder("U")
                                           .leftJoinAndSelect("U.fk_country_id","Country")
                                           .leftJoinAndSelect("U.fk_zipcode_id","ZipCode")
                                           .getMany();

            return res.status(200).json(list);
        } catch(error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }

    registerUser = async (req:any, res:any, next:any) => {
        try {

            return res.status(200).json({
                message: "Registracija novega uporabnika je bila uspešna."
            })

        } catch(error: Error | any){
            return res.status(401).json({
                message: error.message
            });
        }
    }

    upload = async (req:Request, res: Response, next: NextFunction) => {
        try {

            const filePath = path.join(process.cwd(), 'src', 'assets', 'other_data',"passengers.csv");
            const records = await this.FR.readFileAndParse(filePath);

            records.map(async (item: any) => {
                let user: User = new User();
                user.first_name = (this.FR.checkIfItemIsValid(item.first_name)) ? null: this.FR.convertToSlovenian(item.first_name);
                
                let findZipCode = await AppDataSource.manager.findBy(ZipCode, {
                    attribute: item.zip_code
                });
                user.fk_zipcode_id = (this.FR.checkIfObjectIsEmpty(findZipCode[0]) == null) ? null : findZipCode[0];
                
                user.phone_number = (this.FR.checkIfItemIsValid(item.TELEFON)) ? null: item.TELEFON; 
                
                let findCountry = await AppDataSource.manager.findBy(Country, {
                    type: item.country
                });
                user.fk_country_id = (this.FR.checkIfObjectIsEmpty(findCountry[0]) == null) ? null : findCountry[0];

                user.user_type = "passengers";
                user.email = (this.FR.checkIfItemIsValid(item.email)) ? null: item.email;

                user.created_at = new Date();
                user.updated_at = new Date();
               await AppDataSource.manager.save(user);



            });

            return res.status(200).json({
                message: "Podatki od uporabnikov so bili uspešno shranjeni !"
            })

        } catch (error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }

}