const mongoose = require('mongoose');

const restuarantSchema = new mongoose.Schema({
    restuarantname: {
        type: String,
        required: true
    },
    restuarantemail: {
        type: String,
        required: true
    },
    restuarantthumbnail: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phonenumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    }
});

module.exports = mongoose.models.Restuarant || mongoose.model("Restuarant", restuarantSchema);