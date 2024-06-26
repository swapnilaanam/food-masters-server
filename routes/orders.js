const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();

const SSLCommerzPayment = require('sslcommerz-lts');
const Order = require('../models/Order');
const verifyJWTMiddleware = require('../middlewares/verifyJWTMiddleware');

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

router.get('/customer/:email', verifyJWTMiddleware, async (req, res) => {
    const { email } = req.params;

    try {
        const result = await Order.find({ customerEmail: email });
        return res.status(200).send(result);
    } catch (error) {
        return res.send(error?.message);
    }
});

router.get('/restaurant/:restaurantEmail', verifyJWTMiddleware, async (req, res) => {
    const { restaurantEmail } = req.params;

    try {
        const result = await Order.find({ restaurantEmail: restaurantEmail });
        return res.status(200).send(result);
    } catch (error) {
        return res.send(error?.message);
    }
});

router.get('/order/:id', verifyJWTMiddleware, async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Order.findOne({ _id: id });
        return res.status(200).send(result);
    } catch (error) {
        return res.send(error?.message);
    }
});

router.post('/', verifyJWTMiddleware, async (req, res) => {
    const tranId = new ObjectId().toString();

    const orderInfo = req.body;

    orderInfo.orderedConfirmedStatus = false;
    orderInfo.transactionId = tranId;

    const data = {
        total_amount: orderInfo.total,
        currency: 'BDT',
        tran_id: tranId, // use unique tran_id for each api call
        success_url: `http://localhost:4000/payments/success/${tranId}`,
        fail_url: `http://localhost:4000/payments/fail/${tranId}`,
        cancel_url: `http://localhost:4000/payments/cancel/${tranId}`,
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

router.patch('/:id', verifyJWTMiddleware, async (req, res) => {
    const { id } = req.params;

    let updateDoc;

    if (req.body.deliveryStatus) {
        const { deliveryStatus } = req.body;

        updateDoc = {
            $set: {
                deliveryStatus: deliveryStatus
            }
        };
    }

    if (req.body.isRated) {
        const { isRated } = req.body;

        updateDoc = {
            $set: {
                isRated: isRated
            }
        };
    }

    try {
        const result = await Order.findByIdAndUpdate(id, updateDoc);
        return res.status(200).send(result);
    } catch (error) {
        return res.status(500).send(error?.message)
    }
});

module.exports = router;