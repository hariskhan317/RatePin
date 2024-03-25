const express = require('express');
const router = express.Router();
const Pin = require('../models/Pin')

router.post('/', async (req, res) => {
    const newPin = new Pin(req.body)
    try {
        const result = await newPin.save();
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send(err);
        console.log(err)
    }
})

router.get('/', async (req, res) => {
    try {
        const pins = await Pin.find();
        res.status(200).send(pins);
    } catch(err) {
        res.status(500).send(err);
        console.log(err)
    }
})

module.exports = router;