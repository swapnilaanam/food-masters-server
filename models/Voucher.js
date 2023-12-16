const mongoose = require('mongoose');

const voucherSchema = new mongoose.Schema({
    voucherCode: {
        type: String,
        required: true
    },
    discountAmount: {
        type: Number,
        required: true
    },
    expiredDate: {
        type: Date,
        required: true

    }
});

module.exports = mongoose.models.Voucher || mongoose.model("Voucher", voucherSchema);