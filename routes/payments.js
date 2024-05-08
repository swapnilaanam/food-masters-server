const express = require('express');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const router = express.Router();

router.post('/success/:tranId', async (req, res) => {
    const { tranId } = req.params;

    try {
        const singleOrder = await Order.findOne({ transactionId: tranId });

        if (singleOrder) {

            const cartUpdatedDoc = {
                $set: {
                    cartItems: []
                }
            };

            await Cart.findOneAndUpdate({ userEmail: singleOrder.customerEmail }, cartUpdatedDoc);

            const updateDoc = {
                $set: {
                    orderConfirmedStatus: true
                }
            };

            const result = await Order.findByIdAndUpdate(singleOrder._id, updateDoc);

            if (result) {
                res.redirect(`http://localhost:3000/payments/success/${singleOrder?._id}`);
            }
        }
    } catch (error) {
        console.log(error?.message);
    }
});


router.post(`/fail/:tranId`, async (req, res) => {
    const { tranId } = req.params;

    try {
        const result = await Order.findOneAndDelete({transactionId: tranId});
        
        if(result) {
            res.redirect(`http://localhost:3000/payments/fail`);
        }
    } catch (error) {
        return res.status(500).send(error?.message);
    }
});

router.post(`/cancel/:tranId`, async (req, res) => {
    const { tranId } = req.params;

    try {
        const result = await Order.findOneAndDelete({transactionId: tranId});

        if(result) {
            res.redirect(`http://localhost:3000/payments/cancel`)
        }
    } catch (error) {
        console.log(error?.message);
    }
});

module.exports = router;