const express = require("express");
const router = express.Router();
const productController = require("./productsController");
const { verifyToken } = require("../Auth/jwtUtils");

// GET all products

router.get("/", productController.getAllProducts);

// Middleware to verify JWT token before accessing routes
router.use(verifyToken);

// GET a single product by ID
router.get("/:productId", productController.getProductsById);

// POST create a new product
router.post("/", productController.createProduct);

// PUT update a product by ID
router.put("/:productId", productController.updateProduct);

// DELETE delete a product by ID
router.delete("/:productId", productController.deleteProduct);

module.exports = router;