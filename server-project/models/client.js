const mongoose = require("mongoose");
const clientSchema = mongoose.Schema({
    name: { type: String },
    email: { type: String },
    active: { type: Boolean },
    photo: { type: Array },
})

module.exports = mongoose.model("Client", clientSchema);