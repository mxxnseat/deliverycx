import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";

import mongoConnect from "./db";
import iiko from "./services/iiko";

import api from "./routers/api";
import shop from "./routers/shop";
import profile from "./routers/profile";

const App = express();
const PORT = process.env.PORT || 5001;

App.use(cors())
App.use(bodyParser())

App.use("/api", api);
App.use("/profile", profile);
App.use("/shop", shop);

iiko.pooling();


App.listen(PORT, () => {
    try {
        console.log(`starting on ${PORT}`);
        mongoConnect()
            .catch(e => console.log(e));
    } catch (e: unknown) {
        console.log(e);
    }
});

