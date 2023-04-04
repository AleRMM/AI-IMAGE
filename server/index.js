import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";

//Routes Import
import postRoutes from "./routes/postRoutes.js";
import auraRoutes from "./routes/auraRoutes.js";

dotenv.config();

//Middleware cors: Nos permite el acceso a solicitudes de recusos cruzados a la app.
//Esto significa que la app puede recibir solicitudes de recursos que provengan de dominios diferentes.
const app = express();
app.use(cors());
//Establecemos el limite de peso aceptado en la solicitud JSON.
app.use(express.json({ limit: "50mb" }));

/* RUTAS */
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/aura", auraRoutes);

app.get('/', async (req, res) => {
    res.status(200).json({
        message: 'Hello from Aura!',
    });
});

const startServer = async () => {
    try{
        connectDB(process.env.MONGODB_URL)
        app.listen( 6700, () => console.log("Our server is running on port http://localhost:6700"))
    }catch (error){
        console.log(error)
    }
} 

startServer()