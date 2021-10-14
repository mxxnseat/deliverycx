import { NextFunction, Response, Request } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { User } from "../db/models";
import generateUserTokens from "../helpers/generateTokens";

async function authCheck(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization as string;

    if (!authToken) return res.status(401).json({
        isAuth: false
    });

    try {
        const token = authToken.split(" ")[1];

        jwt.verify(token, process.env.JWT_SECRET as string, async (err, decode) => {
            if (err) {
                if (err instanceof TokenExpiredError) {
                    const username = await jwt.decode(token, {complete: true})?.payload?.username;

                    const cookiesRefresh = req.cookies.refresh;
                    await jwt.verify(cookiesRefresh, process.env.JWT_SECRET as string);

                    const { access, refresh } = generateUserTokens(username);
                    req.body.username = username;
                    req.body.tokens = { access, refresh };

                    next();
                } else {
                    throw Error();
                }
            } else {
                const username = decode?.username;

                const { access, refresh } = generateUserTokens(username);
                req.body.username = username;
                req.body.tokens = { access, refresh };
                next();
            }

        });
    } catch (e) {
        console.log(e);
        res.status(401).json({
            isAuth: false
        });
    }
}

export default authCheck