import express from "express";
import * as dotenv from "dotenv";

import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const router = express.Router();

//Configuramos la API
const configuration = new Configuration({
    apiKey: process.env.OPENAI_APIKEY
})

const openai = new OpenAIApi(configuration);

//Definimos la ruta y ejecutamos la función para ver si funciona. 
router.route("/").get((req,res) => {
    res.send("Aura says HI!!")
})

//Damos funcionalidad al prompt del front para que la imagen sea generada.
router.route("/").post( async (req,res) => {
    try{
        const { prompt } = req.body;

        const aiResponse = await openai.createImage({
            prompt,
            n: 1,
            size: "1024x1024",
            response_format: "b64_json"
        });

        const image = aiResponse.data.data[0].b64_json;

        res.status(200).json({ photo: image });

    }catch(error){
        console.log(error);
        res.status(500).send(error?.response.data.error.message)
    }
})

export default router;