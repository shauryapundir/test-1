const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
require('dotenv').config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post('/create-order', async (req, res) => {
    const { amount } = req.body;

    const options = {
        amount: amount * 100, // amount in smallest currency unit (paise)
        currency: "INR",
        receipt: "receipt_order_" + Date.now(),
    };

    try {
        const order = await razorpay.orders.create(options);
        res.status(200).json(order);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error creating order");
    }
});

module.exports = router;
