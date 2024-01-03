const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true
    },
    customerEmail: {
        type: String,
        required: true
    },
    customerAddress: {
        type: String,
        required: true
    },
    customerCity: {
        type: String,
        required: true
    },
    customerPhoneNumber: {
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
    },
    restaurantEmail: {
        type: String,
        required: true
    },
    orderedItems: {
        type: Array,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    orderConfirmedStatus: {
        type: Boolean,
        required: true,
        default: false
    },
    transactionId: {
        type: String,
        required: true
    },
    deliveryStatus: {
        type: String,
        required: true,
        default: "Pending"
    }
});

module.exports = mongoose.models.Order || mongoose.model("Order", orderSchema);