const { generateToken } = require("./jwtUtils");
const db = require("../DbConnections/db");

const authController = {
  register: async (req, res) => {
    try {
      const { email, name, number, password } = req.body;

      // Check if user exists
      const userExists = await db.query(
        "SELECT * FROM Users WHERE email = $1",
        [email]
      );
      if (userExists.rows.length > 0) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Create user (password stored in plain text - NOT RECOMMENDED)
      const newUser = await db.query(
        "INSERT INTO Users (email, name, number, password) VALUES ($1, $2, $3, $4) RETURNING *",
        [email, name, number, password]
      );

      // Return user data without token (token will be generated during login)
      res.status(201).json({
        userid: newUser.rows[0].userid,
        email: newUser.rows[0].email,
        name: newUser.rows[0].name,
        number: newUser.rows[0].number,
        message: "Registration successful. Please login.",
      });
    } catch (error) {
      res.status(500).json({
        message: "Registration failed",
        error: error.message,
      });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await db.query("SELECT * FROM Users WHERE email = $1", [
        email,
      ]);
      if (user.rows.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Plain text comparison - NOT RECOMMENDED
      if (password !== user.rows[0].password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Generate token only during login
      const token = generateToken(user.rows[0].userid, user.rows[0].email);

      res.json({
        userid: user.rows[0].userid,
        email: user.rows[0].email,
        name: user.rows[0].name,
        token,
        expiresIn: 86400, // 24 hours in seconds
      });
    } catch (error) {
      res.status(500).json({
        message: "Login failed",
        error: error.message,
      });
    }
  },

  getMe: async (req, res) => {
    try {
      if (!req.user || !req.user.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const user = await db.query(
        "SELECT userid, email, name, number FROM Users WHERE userid = $1",
        [req.user.userId]
      );

      if (user.rows.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(user.rows[0]);
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch user",
        error: error.message,
      });
    }
  },
};

module.exports = authController;