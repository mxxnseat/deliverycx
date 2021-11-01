import fs from "fs";
import path from "path";

import { IProduct } from "../../db/models/api/Product";
import { IValidateSchema, IErrors } from "./validateType";

async function validationCount(cart: Array<{ product: IProduct, amount: number }>) {
    const validationSchema: IValidateSchema[] = JSON.parse(fs.readFileSync(path.resolve(__dirname, "./validationSchema.json"), { encoding: "utf-8" }));
    let errors: IErrors = {};
    cart.forEach(cartEl => {
        const productCode = cartEl.product.group as string;
        const isValidate = validationSchema.find(validateField => {
            
            return cartEl.product.code.includes(validateField.product_code);
        });

        if (isValidate) {
            if (isValidate.total_amount === true) {
                const validateProducts = cart.filter(el => {
                    return el.product.group === productCode;
                });

                const counter = validateProducts.reduce((acc, curVal) => {
                    return acc + curVal.amount;
                }, 0);

                if (counter < isValidate.min_amount || counter > isValidate.max_amount) {
                    errors[productCode] = {
                        message: `Заказ на доставку от ${isValidate.min_amount} шт. Пожалуйста добавьте еще.`
                    };
                }
            } else {
                if (cartEl.amount < isValidate.min_amount || cartEl.amount > isValidate.max_amount) {
                    errors[productCode] = {
                        message: `Заказ на доставку от ${isValidate.min_amount} шт. Пожалуйста добавьте еще.`
                    };
                }
            }
        }
    })
    
    return errors;
}

export default validationCount;