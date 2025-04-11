const express = require("express");
const router = express.Router();
const orderController = require("./orderController");
const { verifyToken } = require("../Auth/jwtUtils");

// Apply JWT verification to all order routes
router.use(verifyToken);

// Cart routes
router.get("/", orderController.getCartItems);
router.patch("/:orderid", orderController.updateOrderQuantity);
router.patch("/:orderid/cancel", orderController.cancelOrder);

// Payment routes
router.post("/create-payment-order", orderController.createPaymentOrder);
router.post("/verify-payment", orderController.verifyPayment);
router.post("/payment-failed", orderController.handlePaymentFailure);
router.get("/user/:userId",  orderController.getUserOrders); // For admins to view any user's orders


module.exports = router;