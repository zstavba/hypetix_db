import path = require("path");
import { AppDataSource } from "../data-source";
import { Country } from "../entity/Country";
import { GroupType } from "../entity/GroupType";
import { ZipCode } from "../entity/ZipCode";
import * as  fs from 'fs';
import {parse} from 'csv-parse';
import { NextFunction, Request, Response } from "express";
import { ArticleType } from "../entity/ArticleType";
import { FileReader } from "../functions/FileReader";
import { User } from "../entity/User";

export class ArticleTypeController{

    public FR: FileReader = new FileReader();

    setActive = (type: string): boolean => {
        switch(type){
            case '1':
                return true;
            break;
            case '0':
                return false;
            break;
        }
    }

    get = async (req: Request, res: Response, next: NextFunction) => {
        try {

            let list = await AppDataSource.getRepository(ArticleType)
                                          .createQueryBuilder("AT")
                                          .leftJoinAndSelect("AT.fk_user_id","User")
                                          .leftJoinAndSelect("AT.fk_group_type","GroupType")
                                          .getMany();
            
            return res.status(200).json(list);

        } catch(error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }

    getByGroupType = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let list = await AppDataSource.getRepository(ArticleType)
                                          .createQueryBuilder("AT")
                                          .leftJoinAndSelect("AT.fk_user_id","User")
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

    getByGroupName = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let list = await AppDataSource.getRepository(ArticleType)
                                          .createQueryBuilder("AT")
                                          .leftJoinAndSelect("AT.fk_user_id","User")
                                          .where({
                                            group_name: req.params.name
                                          })
                                          .getMany();

            return res.status(200).json(list);

        } catch(error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }

    getNumber = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let list = await AppDataSource.getRepository(ArticleType)
                                          .createQueryBuilder("AT")
                                          .leftJoinAndSelect('AT.fk_user_id',"User")
                                          .take(parseInt(req.params.number))
                                          .getMany();
            
            return res.status(200).json(list);


        } catch(error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }

    getInformation = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let info = await AppDataSource.getRepository(ArticleType)
                                          .createQueryBuilder("AT")
                                          .leftJoinAndSelect("AT.fk_user_id","User")
                                          .where({
                                            id: req.params.id
                                          })
                                          .getOne();
            return res.status(200).json(info);

        } catch(error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }

    upload = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let file  = req.file;
            const filePath = path.join(process.cwd(), 'src', 'assets', 'other_data', "article_types.csv");
            const records = await this.FR.readFileAndParse(filePath);

            records.map(async item => {
               let AT: ArticleType = new ArticleType();
               AT.active = (item.active == null || item.active == undefined) ? null :  item.active;
               AT.created_at = new Date();
               AT.type = (item.type == null || item.type == undefined) ? null: item.type;
               AT.title = (item.title == null || item.title == undefined) ? null: this.FR.convertToSlovenian(item.title);
               AT.group_name = (item.group_name == null || item.group_name == undefined) ? null : item.group_name;
               AT.konto = (item.konto == null || item.konto == undefined) ? null: item.konto;
               
               await AppDataSource.manager.save(AT);
            });

            return res.status(200).json({
                message: "Podatki za tipi artiklov so bili uspešno shranjeni !"
            })
        } catch(error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let data = req.body;

            let AT: ArticleType = new ArticleType();
            AT.active = data.article_type_active;
            AT.created_at = new Date();
            AT.fk_user_id = data.article_fk_user_id as User;
            AT.fk_group_type = (this.FR.checkIfObjectIsEmpty(data.article_type_group_type) == null) ? null :  data.article_type_group_type as GroupType;
            AT.code = data.article_type_code;
            AT.konto = data.article_type_konto;
            AT.konto_consignation = data.article_type_konto_consignation;
            AT.title = data.article_type_title;
            
            await AppDataSource.manager.save(AT);

            return res.status(200).json({
                message: "Podatki za Tipi artiklov so bili uspešno ustvarjeni !"
            });

        } catch(error: Error | any) {
            return res.status(401).json({
                message: error.message
            });
        }
    }

}