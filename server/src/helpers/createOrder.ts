import { IProduct } from "db/models/api/Product";
import { CartType } from "db/models/shop/Cart";
import { AsyncReturnType } from "types/asyncReturnType";
import moment from "moment";

type Address = {
    locality: string,
    street: string,
    house: string
}
export type CustomerData = {
    name: string,
    comment: string,
    phone: string,
    times: object, 
    date: string,
    promocode: string,
}

export default function createOrderBody(
    address: Address,
    organization: string,
    customerData: CustomerData, cart: CartType<IProduct>[]
){
    try{
        const {phone, name, comment} = customerData;
        const currentDate = moment().format("YYYY-MM-DD HH:mm:ss");
        console.log(address);
        return {
            organization,
            customer: {
                name,
                phone
            },
            order: {
                date: currentDate,
                phone,
                isSelfService: "false",
                items: cart.map(cartEl=>({
                    id: cartEl.product.id,
                    name: cartEl.product.name,
                    amount: cartEl.amount,
                    code: cartEl.product.code,
                    sum: cartEl.product.price
                })),
                address: {
                    city: address.locality,
                    street: address.street,
                    home: address.house,
                    comment
                }
            }
        }

    }catch(e){
        console.log(e);
        return {};
    }

    
}


export type createOrderType = ReturnType<typeof createOrderBody>;