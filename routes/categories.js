const express = require('express');
const router = express.Router();
const Category = require('../models/Category');


router.get('/', async (req, res) => {
    try {
        const result = await Category.find({}).sort({_id: 1});
        res.status(200).send(result);
    } catch (error) {
        res.send(error?.message);
    }
});

module.exports = router;