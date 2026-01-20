import express from "express"
import mysql from "mysql2"
import cors from "cors"

const app = express()
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"pass",
    database: "football_app"   
})


app.get("/", (req,res)=>{
    res.json("Eso tilin")
})


app.listen(8800, ()=>{
    console.log("Connected to backend!")
}); 