const express = require("express");
const router = express.Router();
const authController = require("./authController");
const { verifyToken } = require("./jwtUtils");

// Public routes
router.post("/register", authController.register);
router.post("/login", authController.login);

// Protected routes
router.get("/me", verifyToken, authController.getMe);
// Add this to your authRoutes.js
router.put("/update", verifyToken, authController.updateProfile);

module.exports = router;