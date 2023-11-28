const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    }
});

module.exports = mongoose.models.Category || mongoose.model("Category", categorySchema);