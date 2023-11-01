const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    profilePic: {
        type: String,
        required: true
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    country: {
        type: String,
        required: true
    }
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);