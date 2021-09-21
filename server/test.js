const express = require("express");
const app = express();


app.get("/", (req, res)=>{
    console.log("connect");
    res.json("IS ALL OK");
})

app.listen(6661, ()=>{
    try{
        console.log("is all good");
    }catch(e){
        console.log( e );
    }
})