const db = require("../DbConnections/db");

const productController = {
  // Create a new product
  createProduct: async (req, res) => {
    try {
      const { product_name, product_weight, price } = req.body;

      // Validate required fields
      if (!product_name || !price) {
        return res.status(400).json({ 
          success: false,
          message: "Product name and price are required" 
        });
      }

      const newProduct = await db.query(
        "INSERT INTO products (product_name, product_weight, price) VALUES ($1, $2, $3) RETURNING *",
        [product_name, product_weight || '', (price)]
      );

      res.status(201).json({
        success: true,
        product: newProduct.rows[0],
        message: "Product created successfully"
      });
    } catch (error) {
      console.error('Product creation error:', error);
      res.status(500).json({
        success: false,
        message: "Failed to create product",
        error: error.message
      });
    }
  },

  // Get all products
  getAllProducts: async (req, res) => {
    try {
      const products = await db.query("SELECT * FROM products ORDER BY productid");
      res.status(200).json({
        success: true,
        count: products.rows.length,
        products: products.rows,
      });
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch products",
        error: error.message,
      });
    }
  },

  // Get product by id
  getProductById: async (req, res) => {
    try {
      const { productId } = req.params;
      const product = await db.query(
        "SELECT * FROM products WHERE productid = $1",
        [productId]
      );

      if (product.rows.length === 0) {
        return res.status(404).json({ 
          success: false,
          message: "Product not found" 
        });
      }

      res.status(200).json({
        success: true,
        product: product.rows[0]
      });
    } catch (error) {
      console.error('Error fetching product:', error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch the product",
        error: error.message,
      });
    }
  },

  // Update a product
  updateProduct: async (req, res) => {
    try {
      const { productId } = req.params;
      const { product_name, product_weight, price } = req.body;

      // Validate required fields
      if (!product_name || !price) {
        return res.status(400).json({ 
          success: false,
          message: "Product name and price are required" 
        });
      }

      const updatedProduct = await db.query(
        "UPDATE products SET product_name = $1, product_weight = $2, price = $3 WHERE productid = $4 RETURNING *",
        [product_name, product_weight || '', parseFloat(price), productId]
      );

      if (updatedProduct.rows.length === 0) {
        return res.status(404).json({ 
          success: false,
          message: "Product not found" 
        });
      }

      res.status(200).json({
        success: true,
        product: updatedProduct.rows[0],
        message: "Product updated successfully"
      });
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({
        success: false,
        message: "Failed to update the product",
        error: error.message,
      });
    }
  },

  // Delete a product
  deleteProduct: async (req, res) => {
    try {
      const { productId } = req.params;
      
      const result = await db.query(
        "DELETE FROM products WHERE productid = $1 RETURNING *",
        [productId]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ 
          success: false,
          message: "Product not found" 
        });
      }

      res.status(200).json({
        success: true,
        message: "Product deleted successfully",
        deletedProduct: result.rows[0],
      });
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({
        success: false,
        message: "Failed to delete the product",
        error: error.message,
      });
    }
  },
};

module.exports = productController;