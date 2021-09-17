import express from "express";
const route = express.Router();

import Api from "../controllers/api";

const api = new Api();

route.get("/getCities", api.getCities);
route.get("/getAddresses", api.getAddresses);
route.get("/getCategories", api.getCategories);
route.get("/getProducts", api.getProducts);
route.get("/getProduct/:id", api.getProduct);


export default route;