const mongoose = require('mongoose');

const voucherSchema = new mongoose.Schema({
    voucherCode: {
        type: String,
        required: true
    },
    discountPercentage: {
        type: Number,
        required: true
    },
    voucherExpiry: {
        type: Date,
        required: true
    },
    minimumAmount: {
        type: Number,
        require: true
    },
    restaurantName: {
        type: String,
        required: true
    },
    restaurantEmail: {
        type: String,
        required: true
    }
});

module.exports = mongoose.models.Voucher || mongoose.model("Voucher", voucherSchema);