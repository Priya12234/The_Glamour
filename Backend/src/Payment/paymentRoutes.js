const express = require('express');
const router = express.Router();
const paymentController = require('./paymentController');

router.post('/create-order', paymentController.createOrder);
router.post('/verify', paymentController.verifyPayment);
router.get('/get-key', paymentController.getKey);

module.exports = router;