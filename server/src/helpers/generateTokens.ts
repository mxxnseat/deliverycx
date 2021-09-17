import jwt from "jsonwebtoken";

function generateUserTokens(user: string | null = null) {
    let username: string;
    if(!user){
        username = `u_${Math.random().toString(36).substr(2, 9)}`;
    }else{
        username = user;
    }

    const access = jwt.sign({ username }, process.env.JWT_SECRET as string, { expiresIn: "7d" });
    const refresh = jwt.sign({ username }, process.env.JWT_SECRET as string, { expiresIn: "30d" });

    return {
        access,
        refresh,
        username
    }
}

export default generateUserTokens;