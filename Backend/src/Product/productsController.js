const db = require("../DbConnections/db");

const appointmentController = {
  // Create a new product
  createProduct: async (req, res) => {
    try {
      const { product_name, product_weight, price, product_image } = req.body;

      // validate the fileds
      if (!product_name || !product_weight || !price || !product_image) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const newProducts = await db.query(
        "INSERT INTO products (product_name, product_weight, price, product_image) VALUES ($1 , $2 , $3 , $4) RETURNING *",
        [product_name, product_weight, price, product_image]
      );

      res.status(200).json({
        message: "Product created successfully",
        product: newProducts.rows[0],
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to create product",
        error: error.message,
      });
    }
  },

  // Get all products
  getAllProducts: async (req, res) => {
    try {
      const products = await db.query("SELECT * FROM products");

      res.status(200).json({
        count: products.rows.length,
        products: products.rows,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch products",
        error: error.message,
      });
    }
  },

  // Get product by id
  getProductsById: async (req, res) => {
    try {
      const { productId } = req.params;
      const productsById = await db.query(
        "SELECT * FROM products WHERE productid = $1",
        [productId]
      );

      res.status(200).json({
        count: productsById.rows.length,
        products: productsById.rows,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetcge the products by Id",
        error: error.message,
      });
    }
  },

  // Update a product
  updateProduct: async (req, res) => {
    try {
      const { productId } = req.params;
      const { product_name, product_weight, price, product_image } = req.body;
      const updatedProduct = await db.query(
        "UPDATE products SET product_name=$1, product_weight=$2, price=$3, product_image=$4 WHERE productid=$5 RETURNING *",
        [product_name, product_weight, price, product_image, productId]
      );
      res.status(200).json({
        message: "Product updated successfully",
        product: updatedProduct.rows[0],
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to update the product",
        error: error.message,
      });
    }
  },

  // Delete a product
  deleteProduct: async (req, res) => {
    try {
      const productId = req.params.id;
      await db.query("DELETE FROM products WHERE productid = $1", [productId]);
      res.status(200).json({
        message: "Product deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to delete the product",
        error: error.message,
      });
    }
  },
};

module.exports = appointmentController;