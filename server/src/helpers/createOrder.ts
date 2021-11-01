import { IProduct } from "db/models/api/Product";
import { CartType } from "db/models/shop/Cart";
import { AsyncReturnType } from "types/asyncReturnType";
import moment from "moment-timezone";

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
        const currentDate = moment.tz("Europe/Moscow").format("YYYY-MM-DD HH:mm:ss")
        const addressSplit = address.address.split(",");
        const street = addressSplit[0].match(/бульвар|проспект/) ?
        addressSplit[0].replace(/(бульвар|проспект)\s(.*)/,"$2 $1").trim()
        : addressSplit[0].replace(/улица|пер|переулок|ул|проспект|пр/i, '').trim();
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
                    street,
                    home: addressSplit[1] ? addressSplit[1] : 0,
                    apartment: address.flat ? address.flat : '0',
                    entrance: address.entrance ? address.entrance : '0',
                    doorphone: address.intercom ? address.intercom : '0',
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