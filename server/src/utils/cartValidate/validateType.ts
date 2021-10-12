import fs from "fs";
import path from "path";

export interface IValidateSchema{
    product_code: string,
    min_amount: number,
    max_amount: number,
    total_amount: boolean,
}


const validationSchema: IValidateSchema[] = JSON.parse(fs.readFileSync(path.resolve(__dirname, "./validationSchema.json"), {encoding: "utf-8"}));
export type IErrors = {
    [key: string]: {
        message: string
    }
}