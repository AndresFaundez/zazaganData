import mysql from "mysql2"

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"pass",    
    database: "football_app"   
})

export default db;
