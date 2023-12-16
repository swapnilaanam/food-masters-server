const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
    try {
        const result = await User.find({});
        res.status(200).send(result);
    } catch (error) {
        res.status(error?.status).send(error?.message);
    }
});

router.get('/:email', async (req, res) => {
    const { email } = req.params;

    try {
        const result = await User.findOne({ email: email });
        if (!result) {
            return res.status(404).send("User Not Found!");
        }

        return res.status(200).send(result);
    } catch (error) {

    }
});

router.post('/', async (req, res) => {
    const userInfo = req.body;

    const newUser = new User(userInfo);

    try {
        const result = await newUser.save();
        res.status(201).send(result);
    } catch (error) {
        res.send(error?.message);
    }
});

module.exports = router;