import { IProduct } from "db/models/api/Product";
import { CartType } from "db/models/shop/Cart";
import { AsyncReturnType } from "types/asyncReturnType";

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
        return {
            organization,
            customer: {
                name,
                phone
            },
            order: {
                date: "2021-09-28 12:00:00",
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
                    street: address.street.split(" ")[1],
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