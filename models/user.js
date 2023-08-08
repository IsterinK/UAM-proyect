const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    name: {type:String},
    lastname: {type:String},
    email: {type:String},
    password: {type:String},
    address: {type: mongoose.Schema.Types.ObjectId, ref:"Address"}
})
module.exports = mongoose.model("User", userSchema)