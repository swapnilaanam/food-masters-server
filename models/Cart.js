const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        require: true,
        unique: true
    },
    cartItems: {
        type: Array,
        require: true
    }
});

module.exports = mongoose.models.Cart || mongoose.model("Cart", cartSchema);