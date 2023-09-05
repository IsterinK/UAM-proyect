const mongoose = require("mongoose");
const serviceSchema = mongoose.Schema({
    name: { type:String },
    description: { type:String },
    photos: { type:Array },
    active: { type:String },
    category: { type: mongoose.Schema.Types.ObjectId, ref:"category"},
});

module.exports = mongoose.model("Service", serviceSchema);