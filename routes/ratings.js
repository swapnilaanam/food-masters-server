const express = require('express');
const Rating = require('../models/Rating');
const verifyJWTMiddleware = require('../middlewares/verifyJWTMiddleware');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const result = await Rating.find({});
        res.status(200).send(result);
    } catch (error) {
        res.status(error?.status).send(error?.message);
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Rating.find({ restaurantId: id });
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error?.message);
    }
});

router.post('/', verifyJWTMiddleware, async (req, res) => {
    const { ratingInfo } = req.body;

    try {
        const newRating = new Rating(ratingInfo);
        const result = await newRating.save();
        res.status(201).send(result);
    } catch (error) {
        res.status(500).send(error?.message);
    }
});

module.exports = router;