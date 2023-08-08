// Librerías
const mongoose = require("mongoose")
const express = require("express")
const app = express()
// Archivos
const {DB_HOST, DB_USER, DB_PASSWORD, PORT, IP_SERVER, API_VERSION} = require("./config")

const connectStr = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/`

// Conexión Mongo
mongoose.connect(connectStr)
 .then(()=>{
    console.log("Conexión éxitosa");
    app.listen(PORT, ()=>console.log(`IP SERVER: \nhttp://${IP_SERVER}:${PORT}/${API_VERSION}`))
 })
 .catch((err)=>console.error(err));

// Apertura del puerto del proyecto

