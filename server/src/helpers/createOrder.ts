import { IProduct } from "db/models/api/Product";
import { ICartSchema } from "db/models/shop/Cart";
import {Document} from "mongoose";
import { AsyncReturnType } from "types/asyncReturnType";
import Profile, { IUserSchema } from "../db/models/profile/User";

interface IModifiers{
    id: string,
    name: string,
    amount: number
}
interface IItems{
    _id: string,
    name: string,
    amount: number,
    code: string,
    sum: number,
    modifiers?: IModifiers[]
}
type ArgType = {
    username: string,
    name: string,
    phone: string,
    comment: string,
    date: string,
    address: string
}

export default async function createOrderBody({username, address, comment, name, phone, date}: ArgType){
    try{
        // const user = await Profile.findOne({username}).populate({
        //     path: "cart",
        //     populate: {
        //         path: "product"
        //     },
        //     select: {
        //         user: 0
        //     }
        // });

        // const items = user.cart.map(el=>{
        //     return {
        //         id: el.product.,
        //         "name": "Хинкали с мясом без зелени",
        //         "amount": 1,
        //         "code": "HI-5",
        //         "sum": 35
        //     }
        // })
        // // const addressGroup = address.match(//i).groups;

        // return {
        //     organization,
        //     customer: {
        //         name,
        //         phone
        //     },
        //     "order": {
        //         "date": "2021-09-28 12:00:00",
        //         phone,
        //         "isSelfService": "false",
        //         "items": [
        //             {
        //                 "id": "ba0c5dd2-c5a8-4d15-a81c-8bbdb7c9adf5",
        //                 "name": "Хинкали с мясом без зелени",
        //                 "amount": 1,
        //                 "code": "HI-5",
        //                 "sum": 35
        //             }
        //         ],
        //         "address": {
        //             "city": "Симферополь",
        //             "street": "Павленко",
        //             // home,
        //             comment
        //         }
        //     }
        // }

    }catch(e){
        return {};
    }

    
}


export type createOrderType = AsyncReturnType<typeof createOrderBody>;