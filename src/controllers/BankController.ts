import { NextFunction, Request, Response, response } from "express";
import { AppDataSource } from "../data-source";
import { Country } from "../entity/Country";
import { ZipCode } from "../entity/ZipCode";
import { parse } from "path";

export class BankController{

    getCountry = async (req:Request, res: Response, next:NextFunction) => {
        try {
            const getCountryList = await AppDataSource.manager.find(Country);

            return res.status(200).json(getCountryList);
        }catch(error: Error | any){
            return res.status(401).json({
                message: error.message
            });
        }
    }

    getNUmberCountry = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let getC = await AppDataSource.getRepository(Country)
                                          .createQueryBuilder("C")
                                          .take(parseInt(req.params.number))
                                          .getMany();

            return res.status(200).json(getC);


        } catch(error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }

    getZipCode = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const getZipCodeList = await AppDataSource.manager.find(ZipCode);
            return res.status(200).json(getZipCodeList);

        } catch(error: Error | any){
            return res.status(401).json({
                message: error.message
            });
        }
    }

    getNumberZipCOde = async (req:Request, res: Response, next: NextFunction) => {

        try {
            let getZC = await AppDataSource.getRepository(ZipCode)
                                            .createQueryBuilder("ZC")
                                            .take(parseInt(req.params.number))
                                            .getMany();

            return res.status(200).json(getZC);
        } catch(error: Error | any) {
            return res.status(401).json({
                message: error.message
            })
        }

    }

}