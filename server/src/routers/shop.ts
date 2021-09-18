import express from "express";
const route = express.Router();

import Shop from "../controllers/shop";
import authCheck from "../middlewares/authCheck";

const shop = new Shop();

route.use(authCheck);

route.post("/addToCart", shop.addToCart);
route.get("/getCart", shop.getCart);

route.patch("/changeAmount", shop.changeAmount)

route.delete("/remove", shop.removeOne);
route.delete("/clear", shop.clear)


export default route;