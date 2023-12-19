const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();

const SSLCommerzPayment = require('sslcommerz-lts');
const Order = require('../models/Order');

const store_id = process.env.SSL_STORE_ID;
const store_passwd = process.env.SSL_STORE_PASS;
const is_live = false;

router.get('/:tranId', async (req, res) => {
    const { tranId } = req.params;

    try {
        const result = await Order.findOne({ transactionId: tranId });
        return res.status(200).send(result);
    } catch (error) {
        return res.send(error?.message);
    }
});

router.get('/restaurant/:restaurantEmail', async (req, res) => {
    const { restaurantEmail } = req.params;

    try {
        const result = await Order.find({ restaurantEmail: restaurantEmail });
        return res.status(200).send(result);
    } catch (error) {
        return res.send(error?.message);
    }
});

router.post('/', async (req, res) => {
    const tranId = new ObjectId().toString();

    const orderInfo = req.body;

    orderInfo.orderedConfirmedStatus = false;
    orderInfo.transactionId = tranId;

    const data = {
        total_amount: orderInfo.total,
        currency: 'BDT',
        tran_id: tranId, // use unique tran_id for each api call
        success_url: `http://localhost:5000/payments/success/${tranId}`,
        fail_url: `http://localhost:5000/payments/fail/${tranId}`,
        cancel_url: 'http://localhost:3030/cancel',
        ipn_url: 'http://localhost:3030/ipn',
        shipping_method: 'Courier',
        product_name: 'Food Item.',
        product_category: 'Food',
        product_profile: 'general',
        cus_name: orderInfo.customerName,
        cus_email: orderInfo.customerEmail,
        cus_add1: orderInfo.customerAddress,
        cus_add2: orderInfo.customerAddress,
        cus_city: orderInfo.customerCity,
        cus_state: orderInfo.customerCity,
        cus_postcode: null,
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name: orderInfo.restaurantName,
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };

    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);

    sslcz.init(data).then(async (apiResponse) => {
        // Redirect the user to payment gateway
        let GatewayPageURL = apiResponse.GatewayPageURL;
        res.status(200).send({ url: GatewayPageURL });
        // console.log('Redirecting to: ', GatewayPageURL);

        try {
            const newOrder = new Order(orderInfo);
            await newOrder.save();
        } catch (error) {
            console.log(error?.message);
        }
    });
});

module.exports = router;