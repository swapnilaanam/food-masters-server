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
})

router.post('/', async (req, res) => {
    const userInfo = req.body;

    const newUser = new User(userInfo);

    try {
        const result = await newUser.save();
        res.status(201).send(result);
    } catch (error) {
        res.status(error?.status).send(error?.message);
    }
});

module.exports = router;