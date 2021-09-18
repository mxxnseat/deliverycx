import { Request, Response } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";
import { User } from "../db/models";
import { IUserSchema } from "../db/models/profile/User";
import generateUserTokens from "../helpers/generateTokens";



class Profile {
    public async login(req: Request, res: Response) {
        const authToken = req.headers.authorization as string;
        const organizationId = req.body.organizationId as string;
        try {
            if (authToken !== undefined) {
                const token = authToken.split(" ")[1];

                jwt.verify(token, process.env.JWT_SECRET as string, async (err, _) => {
                    const decode = jwt.decode(token, { complete: true })?.payload;
                    const username = decode?.username;

                    const user = await User.findOne({ username });

                    if (!user) {
                        res.status(401).json("Not authorized");
                        return;
                    }
                    if (err) {
                        if (err?.name === "TokenExpiredError") {
                            return jwt.verify(user.token.refresh, process.env.JWT_SECRET as string, async (err: any, _: any) => {

                                if (err) {
                                    res.status(401).json("Not authorized, " + err.name);
                                    return;
                                }

                                const { access, refresh } = generateUserTokens(user.username);
                                user.token = {
                                    access, refresh
                                }
                                await user.save();

                                res.status(200).json(access);
                            });
                        }
                        else {
                            return res.status(401).json("Not authorized, " + err?.name);
                        }
                    }
                    const { access, refresh } = generateUserTokens(user.username);
                    user.token = {
                        access, refresh
                    }
                    await user.save();
                    res.status(200).json(access);

                });
            } else {
                const access = await this.register(organizationId);
                if(!access)
                {
                    throw Error();
                }
                res.status(200).json(access);
            }
        } catch (e: any) {
            console.log(e);
            res.status(401).json("Not authhorized, \n" + e?.message);
        }
    }

    async register(organizationId: string): Promise<string | null> {
        if (organizationId) {
            try {
                const { access, refresh, username } = generateUserTokens();

                await User.create({
                    token: {
                        access,
                        refresh
                    },
                    organizationId,
                    username
                });

                return access;
            } catch (e) {
                console.log(e);
            }
        }
        
        return null;
    }
    private async update() {

    }
}

export default Profile;