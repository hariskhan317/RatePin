const express = require('express');
const router = express.Router();
const User = require('../models/User')
const bcrypt = require('bcrypt') 

// register
router.post('/register', async(req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        const user = await newUser.save();
        res.status(200).send(user._id);

    } catch (err) {
        console.error("Error in registration:", err);
        res.status(500).send("Internal Server Error");
    }
});



// login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) {
            return res.status(404).send("wrong Username or Password")
        }

        const validatePassword = await bcrypt.compare(req.body.password, user.password);
        if (!validatePassword) {
            return res.status(404).send("wrong Username or Password")
        }

        res.status(200).send({ _id: user._id, username: username })

    } catch (err) {
        res.status(500).send(err);
        console.log(err)
    }
})





module.exports = router;