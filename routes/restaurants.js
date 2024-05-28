const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');
const verifyJWTMiddleware = require('./../middlewares/verifyJWTMiddleware');


router.get('/', async (req, res) => {
    const { search } = req.query;

    if (search) {
        const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp('^' + escapedSearch, 'i');

        try {
            const result = await Restaurant.find({ restaurantName: { $regex: regex } });
            res.status(200).send(result);
        } catch (error) {
            res.status(error?.status).send(error?.message);
        }
    }
    else {
        try {
            const result = await Restaurant.find({});
            res.status(200).send(result);
        } catch (error) {
            res.status(error?.status).send(error?.message);
        }
    }
});

router.get('/:email', async (req, res) => {
    const { email } = req.params;
    try {
        const result = await Restaurant.findOne({ restaurantEmail: email });
        res.status(200).send(result);
    } catch (error) {
        res.status(error?.status).send(error?.message);
    }
});

router.get('/restaurant/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Restaurant.findOne({ _id: id });
        res.status(200).send(result);
    } catch (error) {
        res.send(error?.message);
    }
});


router.post('/', verifyJWTMiddleware, async (req, res) => {
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

router.patch('/:email', verifyJWTMiddleware, async (req, res) => {
    const { email } = req.params;
    const { category } = req.body;

    try {
        const result = await Restaurant.findOne({ restaurantEmail: email });

        if (result.tags.includes(category)) {
            res.status(200).send("Already Added...");
        }
        else {
            const updatedTags = [...result.tags, category];

            const updateDoc = {
                $set: {
                    tags: updatedTags
                }
            }

            const result1 = await Restaurant.findByIdAndUpdate(result._id, updateDoc);
            res.status(200).send(result1);
        }
    } catch (error) {
        res.send(error?.message);
    }
});

module.exports = router;