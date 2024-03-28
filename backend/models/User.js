const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        min: 3,
        require: true,
    },
    email: {
        type: String,
        min: 6,
        require: true,
        unique: true
    },
    password: {
        type: String,
        min: 6,
        require: true,
    }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)