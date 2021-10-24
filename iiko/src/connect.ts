import mongoose from "mongoose";

async function connect(){
    await mongoose.connect(process.env.mongo_connect_url as string);
    console.log("success connect to mongo deliverycx");
}

export default connect;