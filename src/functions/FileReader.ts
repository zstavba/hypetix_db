import { parse } from "csv-parse";
import * as  fs from 'fs';

export class FileReader{

    checkIfItemIsValid = (item: string) => {
        return item === undefined || item === null || item === '';
    }

    checkIfArrayIsEmpty = (array: Array<any>) : undefined | any[] => {
        if(array === undefined || array === null){
            return undefined;
        }else if(array.length === 0){
            return undefined;
        } else {
            return array;
        }
    }

    checkIfObjectIsEmpty = (object: Object | any): undefined => {
        if(object === undefined || object === null){
            return undefined;
        }else if(object.length === 0){
            return undefined;
        }else{
            return object;
        }
    }

    convertToSlovenian = (input: string): string => {
        const slovenianMapping: { [key: string]: string } = {
            '\x8A': 'Š',
            'È': 'Č',
            '\x8E': 'Ž',
            'è': 'č',
            '\x9A': 'š',
            '\x9E': "ž"
        };
        return input.replace(/[\x8A\x8E\x9A\x9E\xC8èšž]/g, (match) => {
            return slovenianMapping[match] || match; 
        });
    }
    readFileAndParse = async (filePath: string): Promise<any[]> =>  {
        try {
            const fileData = fs.readFileSync(filePath);
            const test = fileData.toString();
            const records = await new Promise<any[]>((resolve, reject) => {
                parse(fileData, { columns: true, encoding: "binary" }, (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        if (!data || data.length === 0) {
                            reject(new Error("File is empty or undefined"));
                        } else {
                            resolve(data);
                        }
                    }
                });
            });
            return records;
        } catch (error) {
            throw error;
        }
    }
}