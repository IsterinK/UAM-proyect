const mongoose = require('mongoose')
const address = require('./address')
const userSchema = mongoose.Schema({
    name: { type: String },
    lastname: { type: String },
    email: { type: String },
    password: { type: String },
    active: { type: Boolean },
    rol: { type: String },
    address: { type: mongoose.Schema.Types.ObjectId, ref:"Address"}
})

module.exports = mongoose.model("User", userSchema);