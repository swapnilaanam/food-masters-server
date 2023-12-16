const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    foodName: {
        type: String,
        required: true
    },
    foodCategory: {
        type: String,
        required: true
    },
    foodImage: {
        type: String,
        required: true
    },
    foodPrice: {
        type: Number,
        required: true
    },
    foodDesc: {
        type: String
    },
    restaurantEmail: {
        type: String,
        required: true
    },
    restaurantId: {
        type: String,
        required: true
    },
    restaurantName: {
        type: String,
        required: true
    }
});

module.exports = mongoose.models.Menu || mongoose.model("Menu", menuSchema);