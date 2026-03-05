import db from "../db.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'



export const register = (req,res) =>{
    const q = 'SELECT * FROM USERS WHERE username = ?'
    db.query(q,[req.body.username], (err, data)=>{
        if (err) return res.json(err);
        if(data.length) return res.status(409).json("Este usuario ya existe.");
        
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);

        const q = 'INSERT INTO users(`username`,`password_hash`, `nickname`, `preferred_position`, `is_admin`) VALUES (?)'
        const values = [
            req.body.username,
            hash,
            req.body.nickname,
            req.body.preferred_position,
            0
        ]
        db.query(q,[values],(err, data)=>{
            if (err) return res.json(err);
            return res.status(200).json("User has been created.");
        })
    })
}

export const login = ((req, res)=>{
    const q = 'Select * FROM users WHERE username = ?'
    db.query(q,[req.body.username], (err, data)=>{
        if (err) return res.json(err);
        if(data.length ===0) return res.status(404).json("Usuario no encontrado.")
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password_hash)
        if(!isPasswordCorrect) return res.status(400).json("Usuario o Contraseña incorrecta.")
            

    const token = jwt.sign({id: data[0].id}, "jwtkey");
    const {password_hash, ...other} = data[0];

    res.cookie("acces_token", token, {
        httpOnly: true, 
        })
        .status(200)
        .json(other)
    });

    
});

    export const logout = ((req, res)=>{
        res.clearCookie("acces_token",{
            sameSite: "none",
            secure: true
        })
        .status(200)
        .json("Usuario desconectado.")
    })