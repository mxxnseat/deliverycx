import express from "express";
const route = express.Router();

import Middleware from "../middlewares/shop";
import Shop from "../controllers/shop";

const shop = new Shop();
const middleware = new Middleware();

route.use(middleware.authenticate);

route.post("/addToCart", shop.addToCart);
route.delete("/remove/:cartId", shop.removeOne);
route.delete("/clear", shop.clear)
route.patch("/changeAmount", shop.changeAmount)

export default route;