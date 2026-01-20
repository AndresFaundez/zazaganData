import express from 'express';



const app = express()
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"pass",
    database: "forms"   
})

app.listen(8800,()=>{
    console.log("backend connected")
})