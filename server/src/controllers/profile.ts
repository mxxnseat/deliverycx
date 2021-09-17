import { Request, Response } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";
import { User } from "../db/models";
import { IUserSchema } from "../db/models/profile/User";
import generateUserTokens from "../helpers/generateTokens";



class Profile {
    public async login(req: Request, res: Response) {
        const authToken = req.headers.authorization as string;
        try {
            if (authToken !== undefined) {
                const token = authToken.split(" ")[1];

                jwt.verify(token, process.env.JWT_SECRET as string, async (err, _) => {
                    const decode = jwt.decode(token, { complete: true })?.payload;
                    const username = decode?.username;

                    const user = await User.findOne({ username, 'token.access': token });

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
                const access = await this.register();
                res.status(200).json(access);
            }
        } catch (e: any) {
            console.log(e);
            res.status(401).json("Not authhorized, \n" + e?.message);
        }
    }

    async register(req?: Request, res?: Response): Promise<string | void> {
        if (req && res) {
            try {

            } catch (e: unknown) {
                console.log(e);
                res.status(500).json("Server error");
            }
        } else {
            try {
                const { access, refresh, username } = generateUserTokens();

                await User.create({
                    token: {
                        access,
                        refresh
                    },
                    username
                });

                return access;
            } catch (e) {
                console.log(e);
            }
        }
    }
    async getUser(username: string) {
        const user: IUserSchema = await User.findOne({ username }, { token: false, _id: false });

        return user;
    }
    private async update() {

    }
}

export default Profile;