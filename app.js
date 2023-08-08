const bodyParser = require("body-parser")
const express = require('express')
const addressRouter = require("./routes/address")

const {API_VERSION, IP_SERVER} = require('./config')
PORT = 3000

const app = express();

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(`/${API_VERSION}/addresses`, addressRouter)

module.exports = {
    PORT,
    app
};