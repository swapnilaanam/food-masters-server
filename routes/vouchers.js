const express = require('express');
const Voucher = require('../models/Voucher');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const result = await Voucher.find({});
        return res.status(200).send(result);
    } catch (error) {
        return res.status(404).send(error?.message);
    }
});

router.post('/', async (req, res) => {
    const voucher = req.body;

    try {
        const newVoucher = new Voucher(voucher);

        const result = await newVoucher.save();
        return res.status(201).send(result);
    } catch (error) {
        return res.status(424).send(error?.message);
    }
});

router.post('/verify', async (req, res) => {
    const voucher = req.body;

    try {
        const isVoucherExist = await Voucher.findOne({ voucherCode: voucher.voucherCode });

        if (!isVoucherExist) {
            return res.status(404).send({ voucherMatched: false, message: "Voucher Code Does Not Exist..." });
        }

        const currentDate = new Date();

        const voucherDate = new Date(isVoucherExist.expiredDate);

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