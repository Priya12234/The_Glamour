const db = require("../DbConnections/db");

const orderController = {
  // Get user's cart items (orders with pending status)
  getCartItems: async (req, res) => {
    try {
      const userId = req.user.userId;

      const query = `
        SELECT 
          o.orderid, 
          o.userid,
          o.productid, 
          o.name as customer_name,
          o.number as customer_number,
          o.product_name,
          p.product_weight,
          o.quantity, 
          o.total,
          p.price as unit_price,
          p.product_image,
          o.status
        FROM Orders o
        JOIN Products p ON o.productid = p.productid
        WHERE o.userid = $1 AND o.status = 'Pending'
        ORDER BY o.orderid DESC
      `;

      const result = await db.query(query, [userId]);

      res.status(200).json({
        success: true,
        orders: result.rows,
      });
    } catch (error) {
      console.error("Error fetching cart items:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch cart items",
        error: error.message,
      });
    }
  },

  // Update order quantity
  updateOrderQuantity: async (req, res) => {
    try {
      const { orderid } = req.params;
      const { quantity } = req.body;
      const userId = req.user.userId;

      if (!quantity || quantity <= 0) {
        return res.status(400).json({
          success: false,
          message: "Invalid quantity",
        });
      }

      // Get product price
      const priceQuery = `
        SELECT p.price 
        FROM Orders o
        JOIN Products p ON o.productid = p.productid
        WHERE o.orderid = $1 AND o.userid = $2 AND o.status = 'Pending'
      `;
      const priceResult = await db.query(priceQuery, [orderid, userId]);

      if (priceResult.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Order not found or not modifiable",
        });
      }

      const unitPrice = priceResult.rows[0].price;
      const newTotal = unitPrice * quantity;

      // Update the order
      const updateQuery = `
        UPDATE Orders 
        SET quantity = $1, total = $2 
        WHERE orderid = $3
        RETURNING *
      `;
      const updateResult = await db.query(updateQuery, [quantity, newTotal, orderid]);

      res.status(200).json({
        success: true,
        message: "Order updated successfully",
        order: updateResult.rows[0],
      });
    } catch (error) {
      console.error("Error updating order quantity:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update order quantity",
        error: error.message,
      });
    }
  },

  // Cancel order
  cancelOrder: async (req, res) => {
    try {
      const { orderid } = req.params;
      const userId = req.user.userId;

      const verifyQuery = `
        SELECT 1 FROM Orders 
        WHERE orderid = $1 AND userid = $2 AND status = 'Pending'
      `;
      const verifyResult = await db.query(verifyQuery, [orderid, userId]);

      if (verifyResult.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Order not found or not cancellable",
        });
      }

      const updateQuery = `
        UPDATE Orders 
        SET status = 'Cancelled' 
        WHERE orderid = $1
        RETURNING *
      `;
      const updateResult = await db.query(updateQuery, [orderid]);

      res.status(200).json({
        success: true,
        message: "Order cancelled successfully",
        order: updateResult.rows[0],
      });
    } catch (error) {
      console.error("Error cancelling order:", error);
      res.status(500).json({
        success: false,
        message: "Failed to cancel order",
        error: error.message,
      });
    }
  },

  // Create payment order and handle payment verification
  createPaymentOrder: async (req, res) => {
    const client = await db.getClient();
    try {
      const { amount, items } = req.body;
      const userId = req.user.userId;

      if (!amount || amount <= 0 || !items || items.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Invalid amount or items",
        });
      }

      await client.query('BEGIN');

      // 1. Verify all items belong to the user and are pending
      const verifyQuery = `
        SELECT orderid, total FROM Orders
        WHERE userid = $1 AND status = 'Pending'
        AND orderid IN (${items.map((_, i) => `$${i + 2}`).join(',')})
        FOR UPDATE
      `;
      const verifyParams = [userId, ...items.map(item => item.id)];
      const verifyResult = await client.query(verifyQuery, verifyParams);

      if (verifyResult.rows.length !== items.length) {
        await client.query('ROLLBACK');
        return res.status(400).json({
          success: false,
          message: "Some items are not valid for checkout",
        });
      }

      // 2. Calculate total amount to verify
      const calculatedAmount = verifyResult.rows.reduce((sum, item) => sum + item.total, 0) * 100;
      
      if (Math.abs(calculatedAmount - amount) > 1) { // Allow small rounding differences
        await client.query('ROLLBACK');
        return res.status(400).json({
          success: false,
          message: "Amount doesn't match order total",
        });
      }

      // 3. Mark items as Processing (payment in progress)
      const processingQuery = `
        UPDATE Orders 
        SET status = 'Processing' 
        WHERE userid = $1 AND orderid IN (${items.map((_, i) => `$${i + 2}`).join(',')})
        RETURNING *
      `;
      await client.query(processingQuery, [userId, ...items.map(item => item.id)]);

      // 4. Generate Razorpay order ID (in real app, call Razorpay API here)
      const razorpayOrderId = `order_${Math.random().toString(36).substr(2, 9)}`;

      await client.query('COMMIT');

      res.status(200).json({
        success: true,
        message: "Payment order created",
        razorpayOrderId: razorpayOrderId,
        amount: amount,
        currency: "INR",
      });
    } catch (error) {
      await client.query('ROLLBACK');
      console.error("Error creating payment order:", error);
      res.status(500).json({
        success: false,
        message: "Failed to create payment order",
        error: error.message,
      });
    } finally {
      client.release();
    }
  },

  // Verify payment and update status
  verifyPayment: async (req, res) => {
    const client = await db.getClient();
    try {
      const { razorpay_payment_id, razorpay_order_id, orderIds } = req.body;
      const userId = req.user.userId;

      if (!razorpay_payment_id || !razorpay_order_id || !orderIds || orderIds.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Missing payment verification data",
        });
      }

      await client.query('BEGIN');

      // 1. Verify the orders are in Processing state and belong to user
      const verifyQuery = `
        SELECT COUNT(*) as count FROM Orders
        WHERE userid = $1 AND status = 'Processing'
        AND orderid IN (${orderIds.map((_, i) => `$${i + 2}`).join(',')})
        FOR UPDATE
      `;
      const verifyParams = [userId, ...orderIds];
      const verifyResult = await client.query(verifyQuery, verifyParams);

      if (verifyResult.rows[0].count !== orderIds.length) {
        await client.query('ROLLBACK');
        return res.status(400).json({
          success: false,
          message: "Orders not found or not in valid state for completion",
        });
      }

      // 2. Update orders to Delivered (payment successful)
      const updateQuery = `
        UPDATE Orders 
        SET status = 'Delivered',
            payment_id = $1,
            payment_date = NOW()
        WHERE userid = $2 AND orderid IN (${orderIds.map((_, i) => `$${i + 3}`).join(',')})
        RETURNING *
      `;
      const updateParams = [razorpay_payment_id, userId, ...orderIds];
      const updateResult = await client.query(updateQuery, updateParams);

      await client.query('COMMIT');

      res.status(200).json({
        success: true,
        message: "Payment verified and orders completed",
        orders: updateResult.rows,
      });
    } catch (error) {
      await client.query('ROLLBACK');
      console.error("Error verifying payment:", error);
      res.status(500).json({
        success: false,
        message: "Failed to verify payment",
        error: error.message,
      });
    } finally {
      client.release();
    }
  },

  // Handle payment failure (revert to Pending)
  handlePaymentFailure: async (req, res) => {
    const client = await db.getClient();
    try {
      const { orderIds } = req.body;
      const userId = req.user.userId;

      if (!orderIds || orderIds.length === 0) {
        return res.status(400).json({
          success: false,
          message: "No orders specified",
        });
      }

      await client.query('BEGIN');

      // Verify the orders are in Processing state and belong to user
      const verifyQuery = `
        SELECT COUNT(*) as count FROM Orders
        WHERE userid = $1 AND status = 'Processing'
        AND orderid IN (${orderIds.map((_, i) => `$${i + 2}`).join(',')})
        FOR UPDATE
      `;
      const verifyParams = [userId, ...orderIds];
      const verifyResult = await client.query(verifyQuery, verifyParams);

      if (verifyResult.rows[0].count !== orderIds.length) {
        await client.query('ROLLBACK');
        return res.status(400).json({
          success: false,
          message: "Orders not found or not in valid state for reverting",
        });
      }

      // Revert orders back to Pending status
      const revertQuery = `
        UPDATE Orders 
        SET status = 'Pending'
        WHERE userid = $1 AND orderid IN (${orderIds.map((_, i) => `$${i + 2}`).join(',')})
        RETURNING *
      `;
      const revertResult = await client.query(revertQuery, [userId, ...orderIds]);

      await client.query('COMMIT');

      res.status(200).json({
        success: true,
        message: "Orders reverted to pending status",
        orders: revertResult.rows,
      });
    } catch (error) {
      await client.query('ROLLBACK');
      console.error("Error handling payment failure:", error);
      res.status(500).json({
        success: false,
        message: "Failed to handle payment failure",
        error: error.message,
      });
    } finally {
      client.release();
    }
  }
};

module.exports = orderController;