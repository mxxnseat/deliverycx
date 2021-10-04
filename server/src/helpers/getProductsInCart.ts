import Product from "../db/models/api/Product";
import { CartType } from "db/models/shop/Cart";

export default async function getProductsInCart(cart: CartType<string>[], organization: string){
    const products = [];

    for(let k in cart){
        const cartEl = cart[k];
        const product = await Product.aggregate([
            { $unwind: "$products" },
            {
                $match: {
                    organization,
                    "products.id": cartEl.product
                }
            },
            {
                $project: {
                    _id: 0,
                    organization: 0
                }
            },
            {
                $group: {
                    _id: null,
                    product: { $addToSet: "$products" }
                }
            }
        ]);

        if(product){
            products.push({
                product: product[0].product[0],
                _id: cartEl._id,
                amount: cartEl.amount
            })
        }
    }

    return products;
}