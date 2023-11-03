const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    restaurantName: {
        type: String,
        required: true
    },
    restaurantEmail: {
        type: String,
        required: true
    },
    restaurantThumbnail: {
        type: String,
        required: true
    },
    restaurantPhoneNumber: {
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

module.exports = mongoose.models.Restaurant || mongoose.model("Restaurant", restaurantSchema);