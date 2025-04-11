const express = require("express");
const router = express.Router();
const productController = require("./productsController");
const { verifyToken } = require("../Auth/jwtUtils");

// Add middleware to parse JSON bodies
router.use(express.json());

// GET all products (public route)
router.get("/", productController.getAllProducts);

// Middleware to verify JWT token for protected routes
router.use(verifyToken);

// GET a single product by ID
router.get("/:productId", productController.getProductById);

// POST create a new product
router.post("/", productController.createProduct);

// PUT update a product by ID
router.put("/:productId", productController.updateProduct);

// DELETE delete a product by ID
router.delete("/:productId", productController.deleteProduct);

module.exports = router;