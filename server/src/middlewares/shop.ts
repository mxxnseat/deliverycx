import {NextFunction, Response, Request} from "express";
import jwt from "jsonwebtoken";
import { User } from "../db/models";

class ShopMiddleware{
    authenticate(req: Request, res: Response, next: NextFunction){
        const authToken = req.headers.authorization as string;

        
    }
}

export default ShopMiddleware;