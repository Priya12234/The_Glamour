// Import required modules
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 5000;

// Import routes
const authRoutes = require("./src/Auth/authRoutes");
const appointmentRoutes = require("./src/Appointment/appointmentRoutes");
const productRoutes = require("./src/Product/productsRoutes");
const orderRoutes = require("./src/Order/orderRoutes");
const serviceRouters = require("./src/Services/servicesRoutes");
const feedbackRoutes = require("./src/Feedback/feedbackRoutes");
  
// Initialize the app
const app = express();

// Middleware

app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/services", serviceRouters);
app.use("/api/feedback", feedbackRoutes);

// Define a simple route
app.get("/", (req, res) => {
  res.send("Welcome to the backend API!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});