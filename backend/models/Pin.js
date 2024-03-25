const mongoose = require('mongoose');

const pinSchema = mongoose.Schema({
    username: {
        type: String,
        min: 3,
        max: 10,
        require: true,
        unique: true
    },
    title: {
        type: String,
        min: 3,
        require: true,
    },
    desc: {
        type: String,
        min: 6,
        require: true,
    },
    rating: {
        type: Number,
        min: 0,
        max:5,
        require: true,
    },
    lat: {
        type: Number,
        require: true,
    },
    long: {
        type: Number,
        require: true,
    }
}, {timestamps: true})

module.exports = mongoose.model('Pin', pinSchema)