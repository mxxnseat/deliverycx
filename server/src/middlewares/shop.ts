import {NextFunction, Response, Request} from "express";
import jwt from "jsonwebtoken";
import { User } from "../db/models";

class ShopMiddleware{
    public async authenticate(req: Request, res: Response, next: NextFunction){
        const authToken = req.headers.authorization as string;

        try{
            if(!authToken){
                throw Error()
            }
            const token = authToken.split(" ")[1];
            const result = jwt.verify(token, process.env.JWT_SECRET as string);

            if(result){
                next()
            }
            throw Error();
        }catch(e: unknown){
            console.log(e);
            res.status(401).json("Not authorized");
        }
    }
}

export default ShopMiddleware;