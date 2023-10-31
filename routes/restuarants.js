const express = require('express');
const router = express.Router();
const Restuarant = require('../models/Restuarant');


router.get('/', async (req, res) => {
    try {
        const result = await Restuarant.find({});
        res.status(200).send(result);
    } catch (error) {
        res.status(error?.status).send(error?.message);
    }
});


router.post('/', async (req, res) => {
    const restuarantInfo = req.body;

    const newRestuarant = new Restuarant(restuarantInfo);

    try {
        const result = await Restuarant.save();
        res.status(201).send(result);
    } catch (error) {
        res.status(error?.status).send(error?.message);
    }
});

module.exports = router;