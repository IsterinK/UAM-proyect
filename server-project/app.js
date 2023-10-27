//Importacion de librerias
const bodyParser = require("body-parser")
const express = require("express")
const dotenv = require('dotenv').config();
const addressRoutes = require("./controllers/address")
const userRoutes = require("./routes/user")
const categoryRoutes = require("./routes/category")
const serviceRoutes = require("./routes/service")
const clientRoutes = require("./routes/client")
const cors = require('cors')
//Importacion de archivos
PORT = 3000

const app = express() 
app.use(express.json());

//Visualizacion del contenido del endpoint o envio del contenido
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static("uploads"));
app.use('/uploads', express.static('uploads'));

app.use(cors());  

//Configuracion cabeceras HTTP
app.use(`/api/${process.env.API_VERSION}/addresses`, addressRoutes)
app.use(`/api/${process.env.API_VERSION}/users`, userRoutes)
app.use(`/api/${process.env.API_VERSION}/categories`, categoryRoutes)
app.use(`/api/${process.env.API_VERSION}/services`, serviceRoutes)
app.use(`/api/${process.env.API_VERSION}/clients`, clientRoutes)

/* 
    get = v1/addresses
    post = v1/addresses/new-address
*/
module.exports = app