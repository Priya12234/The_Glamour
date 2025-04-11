const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET || "your-very-secret-key";
const JWT_EXPIRES_IN = "24h"; // Token expires in 24 hours

// Generate token for user - now includes isAdmin status
const generateToken = (userId, email, isAdmin = false) => {
  return jwt.sign(
    { 
      userId, 
      email, 
      isAdmin 
    }, 
    JWT_SECRET, 
    { expiresIn: JWT_EXPIRES_IN }
  );
};

// Enhanced verify token middleware
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ 
        message: "Invalid token",
        error: err.message 
      });
    }
    
    // Attach decoded user information to the request
    req.user = {
      userId: decoded.userId,
      email: decoded.email,
      isAdmin: decoded.isAdmin || false // Default to false if not specified
    };
    
    next();
  });
};

// Middleware to verify admin status
// In jwtUtils.js
const verifyAdmin = (req, res, next) => {
  console.log("User in verifyAdmin:", req.user); // Debug log
  if (!req.user?.isAdmin) {
    console.log("Admin check failed for user:", req.user); // Debug log
    return res.status(403).json({ 
      message: "Unauthorized: Admin access required",
      yourUser: req.user // This helps debugging
    });
  }
  next();
};

module.exports = { 
  generateToken, 
  verifyToken,
  verifyAdmin 
};