import { Request, Response } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";
import { User } from "../db/models";
import { IUserSchema } from "../db/models/profile/User";

function generateUserTokens() {
    const username = `u_${Math.random().toString(36).substr(2, 9)}`;

    const access = jwt.sign({ username }, process.env.JWT_SECRET as string, { expiresIn: 60 });
    const refresh = jwt.sign({ username }, process.env.JWT_SECRET as string, { expiresIn: "30d" });

    return {
        access,
        refresh,
        username
    }
}


class Profile {
    public async login(req: Request, res: Response) {
        const authToken = req.headers.authorization as string;
        try {
            if (authToken !== undefined) {
                const token = authToken.split(" ")[1];

                jwt.verify(token, process.env.JWT_SECRET as string, async (err, _) => {
                    const decode = jwt.decode(token, { complete: true })?.payload;
                    const username = decode?.username;

                    const user = await User.findOne({ username });


                    if (err || !user) {
                        if (err?.name === "TokenExpiredError") {
                            return jwt.verify(user.token.refresh, process.env.JWT_SECRET as string, async (err: any, _:any) => {

                                if (err) {
                                    res.status(401).json("Not authorized, "+err.name);
                                    return;
                                }

                                const { access, refresh } = generateUserTokens();
                                user.token = {
                                    access, refresh
                                }
                                await user.save();

                                res.status(200).json("ok");
                            });
                        }
                        else {
                            return res.status(401).json("Not authorized, "+err?.name);
                        }
                    }
                    const { access, refresh } = generateUserTokens();
                    user.token = {
                        access, refresh
                    }
                    await user.save();
                    res.status(200).json("ok");

                });
            } else {
                await this.register();
                res.status(200).json("ok");
            }
        } catch (e: any) {
            console.log(e);
            res.status(401).json("Not authhorized, \n" + e?.message);
        }
    }

    async register(req?: Request, res?: Response): Promise<void> {
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