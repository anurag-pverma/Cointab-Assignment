import express from 'express'
import cors from "cors"
import mongoose from 'mongoose'
const PORT = 8000;


const app = express();
app.use(express.json());
app.use(cors())

app.get("/",(req, res)=>{
    res.send("WELCOME TO MY HOME")
})
app.get("/singup",(req, res)=>{
    res.send("WELCOME TO MY HOME")
})
app.get("/login",(req, res)=>{
    res.send("WELCOME TO MY HOME")
})

app.listen(PORT,()=>{
    console.log(`YOUR SERVER IS RUNNING ON ${PORT}`)
})