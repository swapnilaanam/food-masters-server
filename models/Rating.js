const mongoose = require('mongoose');

const ratingSchema = mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    customerName: {
        type: String,
        required: true
    },
    customerEmail: {
        type: String,
        required: true
    },
    restaurantName: {
        type: String,
        required: true
    },
    restaurantEmail: {
        type: String,
        required: true
    },
    restaurantId: {
        type: String,
        required: true
    },
    totalAmount: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    feedbackText: {
        type: String,
        required: true
    }
});

module.exports = mongoose.models.Rating || mongoose.model("Rating", ratingSchema);