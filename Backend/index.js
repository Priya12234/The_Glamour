// Import required modules
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan"); // Add this for logging
const PORT = process.env.PORT || 5000;

// Import routes
const authRoutes = require("./src/Auth/authRoutes");
const appointmentRoutes = require("./src/Appointment/appointmentRoutes");
const productRoutes = require("./src/Product/productsRoutes");
const orderRoutes = require("./src/Order/orderRoutes");
const serviceRouters = require("./src/Service/servicesRoutes");
const feedbackRoutes = require("./src/Feedback/feedbackRoutes");

// Initialize the app
const app = express();

// Middleware
app.use(morgan("dev")); // Add HTTP request logging
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/services", serviceRouters);
app.use("/api/feedback", feedbackRoutes);

// Add these near your other route imports
const paymentRoutes = require('../Backend/src/Payment/paymentRoutes');

// Add this with your other app.use() routes
app.use('/api/payments', paymentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false,
    message: err.message || 'Internal Server Error' 
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false,
    message: "Route not found" 
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});