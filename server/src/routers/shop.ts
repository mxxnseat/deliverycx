import express from "express";
const route = express.Router();

import Shop from "../controllers/shop";

const shop = new Shop();

route.post("/addToCart", shop.addToCart);
route.post("/createOrder", shop.createOrder);

route.get("/getCart", shop.getCart);

route.patch("/changeAmount", shop.changeAmount);

route.delete("/remove", shop.removeOne);
route.delete("/clear", shop.clear);


export default route;