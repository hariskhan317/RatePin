const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        min: 6,
        max: 10,
        require: true,
        unique: true
    },
    email: {
        type: String,
        min: 6,
        max: 10,
        require: true,
        unique: true
    },
    password: {
        type: String,
        min: 6,
        require: true,
    }
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema)