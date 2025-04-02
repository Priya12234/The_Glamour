const db = require("../DbConnections/db");

const orderController = {
  // Create a new order
  createOrder: async (req, res) => {
    try {
      const { productid, name, number, product_name, quantity, total } =
        req.body;
      const userid = req.user.userId;

      // Validate required fields
      if (
        !productid ||
        !name ||
        !number ||
        !product_name ||
        !quantity ||
        !total
      ) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }

      // Validate quantity and total
      if (quantity <= 0 || total < 0) {
        return res.status(400).json({
          success: false,
          message: "Quantity must be > 0 and total must be >= 0",
        });
      }

      const newOrder = await db.query(
        `INSERT INTO Orders 
        (userid, productid, name, number, product_name, quantity, total) 
        VALUES ($1, $2, $3, $4, $5, $6, $7) 
        RETURNING *`,
        [userid, productid, name, number, product_name, quantity, total]
      );

      res.status(201).json({
        success: true,
        message: "Order created successfully",
        order: newOrder.rows[0],
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to create order",
        error: error.message,
      });
    }
  },

  // Get all orders for a user
  getUserOrders: async (req, res) => {
    try {
      const userid = req.user.userId;

        const orders = await db.query(
          `SELECT *
           FROM Orders o
           JOIN Products p ON o.productid = p.productid
           WHERE o.userid = $1
           ORDER BY o.orderid DESC`,
          [userid]
        );

      res.status(200).json({
        success: true,
        count: orders.rows.length,
        orders: orders.rows,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch orders",
        error: error.message,
      });
    }
  },

  // Get order by ID
  getOrderById: async (req, res) => {
    try {
      const { orderid } = req.params;
      const userid = req.user.userId;

      const order = await db.query(
        `SELECT o.*, p.product_image 
         FROM Orders o
         JOIN Products p ON o.productid = p.productid
         WHERE o.orderid = $1 AND o.userid = $2`,
        [orderid, userid]
      );

      if (order.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      res.status(200).json({
        success: true,
        order: order.rows[0],
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch order",
        error: error.message,
      });
    }
  },

  // Update order status (admin only)
  updateOrderStatus: async (req, res) => {
    try {
      const { orderid } = req.params;
      const { status } = req.body;

      // Validate status
      const validStatuses = [
        "Pending",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid status value",
        });
      }

      const updatedOrder = await db.query(
        `UPDATE Orders 
         SET status = $1 
         WHERE orderid = $2 
         RETURNING *`,
        [status, orderid]
      );

      if (updatedOrder.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Order status updated",
        order: updatedOrder.rows[0],
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to update order status",
        error: error.message,
      });
    }
  },

  // Cancel order (user only)
  cancelOrder: async (req, res) => {
    try {
      const { orderid } = req.params;
      const userid = req.user.userId;

      const order = await db.query(
        "SELECT * FROM Orders WHERE orderid = $1 AND userid = $2",
        [orderid, userid]
      );

      if (order.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      // Only allow cancellation if order is Pending
      if (order.rows[0].status !== "Pending") {
        return res.status(400).json({
          success: false,
          message: "Order can only be cancelled if status is Pending",
        });
      }

      const cancelledOrder = await db.query(
        `UPDATE Orders 
         SET status = 'Cancelled' 
         WHERE orderid = $1 
         RETURNING *`,
        [orderid]
      );

      res.status(200).json({
        success: true,
        message: "Order cancelled successfully",
        order: cancelledOrder.rows[0],
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to cancel order",
        error: error.message,
      });
    }
  },
};

module.exports = orderController;