const express = require('express');
const router = express.Router();
const Menu = require('../models/Menu');
const verifyJWTMiddleware = require('./../middlewares/verifyJWTMiddleware');

router.get('/', async(req, res) => {
    try {
        const result = await Menu.find({});
        res.status(200).send(result);
    } catch (error) {
        res.send(error?.message);
    }
});

router.get('/:email', verifyJWTMiddleware, async(req, res) => {
    const {email} = req.params;

    try {
        const result = await Menu.find({restaurantEmail: email});
        res.status(200).send(result);
    } catch (error) {
        res.send(error?.message);
    }
});

router.post('/', verifyJWTMiddleware, async(req, res) => {
    const newFood = req.body;

    // console.log(newFood);
    const newMenu = new Menu(newFood);

    try {
        const result = await newMenu.save();
        res.status(201).send(result);
    } catch (error) {
        res.send(error?.message);
    }
});

router.patch('/:id', verifyJWTMiddleware, async(req, res) => {
    const {id} = req.params;
    const editedFood = req.body;

    const updateDoc = {
        $set: {
            ...editedFood
        }
    }

    try {
        const result = await Menu.findByIdAndUpdate(id, updateDoc);
        res.status(200).send(result);
    } catch (error) {
        res.send(result);
    }
});

router.delete('/:id', verifyJWTMiddleware, async(req, res) => {
    const {id} = req.params;

    try {
        const result = await Menu.findByIdAndDelete(id);
        res.status(200).send(result);
    } catch (error) {
        res.send(error?.message);
    }
})

module.exports = router;