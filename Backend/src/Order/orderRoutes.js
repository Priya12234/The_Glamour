const express = require("express");
const router = express.Router();
const orderController = require("./orderController");
const { verifyToken } = require("../Auth/jwtUtils"); 

// Apply JWT verification to all order routes
router.use(verifyToken);

// User routes
router.post("/", orderController.createOrder);
router.get("/", orderController.getUserOrders);
router.get("/:orderid", orderController.getOrderById);
router.patch("/:orderid/cancel", orderController.cancelOrder);

// Admin routes
router.patch("/:orderid/status", orderController.updateOrderStatus);

module.exports = router;