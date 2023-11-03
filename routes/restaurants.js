const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');


router.get('/', async (req, res) => {
    try {
        const result = await Restaurant.find({});
        res.status(200).send(result);
    } catch (error) {
        res.status(error?.status).send(error?.message);
    }
});


router.post('/', async (req, res) => {
    const restaurantInfo = req.body;

    // console.log(restaurantInfo);

    const newRestaurant = new Restaurant(restaurantInfo);

    try {
        const result = await newRestaurant.save();
        res.status(201).send(result);
    } catch (error) {
        res.send(error?.message);
    }
});

module.exports = router;