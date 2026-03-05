import express from "express"
import cors from "cors"
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import cookieParser from 'cookie-parser'

const app = express()

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);


app.listen(3000, ()=>{
    console.log("Connected to backend!")
});     