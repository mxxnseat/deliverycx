import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";
import { User } from "../db/models";
import generateUserTokens from "../helpers/generateTokens";

async function authCheck(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization as string;

    await new Promise((resolve, reject)=>{
        if(!authToken){
            reject('Not authorized');
        }

        const token = authToken.split(" ")[1];

        jwt.verify(token, process.env.JWT_SECRET as string, async (err)=>{
            const username = jwt.decode(token, { complete: true})?.payload?.username;
            const user = await User.findOne({username});
            if(!user){
                return reject();
            }

            if(err){
                if(err.name === "TokenExpiredError"){
                    jwt.verify(user.token.refresh, process.env.JWT_SECRET as string, async (err: any)=>{
                        if(err){
                            reject();
                        }else{
                            resolve(username);
                        }
                    });
                }else{
                    reject();
                }
            }else{
                resolve(username);
            }
        });
    })
    .then((username)=>{
        const {access, refresh} = generateUserTokens(username as string);

        User.findOneAndUpdate({username: username as string}, {
            $set: {
                token: {
                    access,
                    refresh
                }
            }
        })
        .then((doc)=>{
            req.body.username = username
            next();
        })
        .catch(e=>{
            console.log(e);
            res.status(401).json({
                isAuth: false
            });
        })
    })
    .catch(e=>{
        console.log(e);
        res.status(401).json({
            isAuth: false
        });
    })
}

export default authCheck