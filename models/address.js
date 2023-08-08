const mongoose = require('mongoose')
const addressSchema = mongoose.Schema({
    country: {type:String},
    department: {type:String},
    state: {type:String},
    nomenclature: {type:String}
});
module.exports = mongoose.model("Address", addressSchema)