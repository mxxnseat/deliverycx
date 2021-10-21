import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import mongoConnect from "./db";
import iiko from "./services/iiko";

import api from "./routers/api";
import shop from "./routers/shop";
import profile from "./routers/profile";
import authCheck from "./middlewares/authCheck";


const INDEXHTML = path.resolve(__dirname, "../../client/build/index.html");
const App = express();
const PORT = process.env.PORT || 5001;

App.use(express.static(path.resolve(__dirname, "../../client/build")))
App.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
App.use(bodyParser())
App.use(cookieParser());


App.use("/api", api);

App.use("/profile", profile);
App.use("/shop", authCheck, shop);

App.get("/*", (req: Request, res: Response) => {
    res.sendFile(INDEXHTML);
});

App.listen(PORT, () => {
    try {
        console.log(`starting on ${PORT}`);
        mongoConnect()
            .then(() => {
                iiko.pooling();
                setInterval(()=>{
                    iiko.pooling();
                }, 60*60*6*1000);
                setInterval(()=>{
                    iiko.iikoMethodBuilder(iiko.getStopLists);
                }, 1000*60*10);
            })
            .catch(e => console.log(e));
    } catch (e: unknown) {
        console.log(e);
    }
});