const mongoose = require('mongoose');

 ownerSchema = mongoose.Schema({
    fullname: { type: String },
    email: { type: String },
    password: { type: String },
    products: { type: Array, default: [] },
    contact: { type: Number, required: true, default: " " }, // Default to empty string
    gstno: { type: String, default: " " } // Default to empty string
})
module.exports = mongoose.model('Owner', ownerSchema);
