import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import mongoConnect from "./db";

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

mongoConnect()
    .then(() => {
        App.listen(PORT, () => {
            try {
                console.log(`starting on ${PORT}`);

            } catch (e: unknown) {
                console.log(e);
            }
        });

    })
    .catch(e => console.log(e));
