import { IProduct } from "db/models/api/Product";
import { CartType } from "db/models/shop/Cart";
import { AsyncReturnType } from "types/asyncReturnType";
import moment from "moment";

type Address = {
    flat: string,
    floor: string,
    intercom: string,
    entrance: string,
    address: string,
    city: string
}
export type CustomerData = {
    name: string,
    comment: string,
    phone: string,
    times: object, 
    date: string,
    promocode: string
}

export default function createOrderBody(
    address: Address,
    organization: string,
    customerData: CustomerData, cart: CartType<IProduct>[]
){
    try{
        const {phone, name, comment} = customerData;
        const currentDate = moment().format("YYYY-MM-DD HH:mm:ss");
        const addressSplit = address.address.split(",");
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
                    city: address.city,
                    street: addressSplit[0].replace(/улица|пер|переулок|ул/i, '').trim(),
                    home: addressSplit[1] ? addressSplit[1] : 0,
                    apartment: address.flat ? address.flat : '0',
                    entrance: address.entrance ? address.entrance : '0',
                    floor: address.floor ? address.floor : '0',
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