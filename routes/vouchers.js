const express = require('express');
const Voucher = require('../models/Voucher');
const router = express.Router();
const verifyJWTMiddleware = require('./../middlewares/verifyJWTMiddleware');

router.get('/', async (req, res) => {
    try {
        const result = await Voucher.find({});
        return res.status(200).send(result);
    } catch (error) {
        return res.status(404).send(error?.message);
    }
});

router.get('/:email', async(req, res) => {
    const {email} = req.params;
    try {
        const result = await Voucher.find({restaurantEmail: email});
        return res.status(200).send(result);
    } catch (error) {
        console.log(error?.message);
    }
});

router.post('/', verifyJWTMiddleware, async (req, res) => {
    const voucher = req.body;

    try {
        const newVoucher = new Voucher(voucher);

        const result = await newVoucher.save();
        return res.status(201).send(result);
    } catch (error) {
        return res.send(error?.message);
    }
});

router.post('/verify', verifyJWTMiddleware, async (req, res) => {
    const voucher = req.body;

    try {
        const isVoucherExist = await Voucher.findOne({ voucherCode: voucher.voucherCode });

        if (!isVoucherExist) {
            return res.status(404).send({ voucherMatched: false, message: "Voucher Code Does Not Exist..." });
        }

        if(isVoucherExist?.restaurantEmail !== voucher?.email) {
            return res.status(404).send({voucherMatched: false, message: "Voucher is not applicable for this restaurant!"});
        }

        if(isVoucherExist?.minimumAmount > voucher?.subTotal) {
            return res.status(404).send({voucherMatched: false, message: `You have spend a subtotal of ${isVoucherExist?.minimumAmount} to avail the voucher!`})
        }

        const currentDate = new Date();

        const voucherDate = new Date(isVoucherExist.voucherExpiry);

        if (currentDate < voucherDate) {
            return res.status(200).send({voucherMatched: true, message: "Voucher Code Matched", result: isVoucherExist});
        }
        else {
            return res.status(410).send({voucherMatched: false, message: "Voucher Code Expired"});
        }

    } catch (error) {
        return res.send(error?.message);
    }
});

module.exports = router;