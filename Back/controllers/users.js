import db from "../db.js"

export const getUsers = (req, res) => {
    const q = "SELECT id, username, nickname, preferred_position FROM users";
    db.query(1, (err,data)=>{
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });  
};