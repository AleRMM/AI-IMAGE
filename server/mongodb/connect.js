import mongoose from "mongoose";

const connectDB = (url) => {
    //Configuración que nos ayuda a detectar errores en el esquema de la db.
    mongoose.set("strictQuery", true);

    //Establecemos la conexión con la base de datos.
    mongoose.connect(url)
    .then(() => console.log("MongoDB conncted"))
    .catch((err) => console.log(err))
}

export default connectDB;