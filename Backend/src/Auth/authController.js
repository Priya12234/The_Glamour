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
  // Add this to your authController
  updateProfile: async (req, res) => {
    try {
      const { userId } = req.user;
      const { email, name, number, password } = req.body;

      // First get current user data
      const currentUser = await db.query(
        "SELECT * FROM Users WHERE userid = $1",
        [userId]
      );

      if (currentUser.rows.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      // Update only the fields that were provided
      const updateData = {
        email: email || currentUser.rows[0].email,
        name: name || currentUser.rows[0].name,
        number: number || currentUser.rows[0].number,
        password: password
          ? await bcrypt.hash(password, 10)
          : currentUser.rows[0].password,
      };

      const updatedUser = await db.query(
        "UPDATE Users SET email = $1, name = $2, number = $3, password = $4 WHERE userid = $5 RETURNING userid, email, name, number",
        [
          updateData.email,
          updateData.name,
          updateData.number,
          updateData.password,
          userId,
        ]
      );

      res.json({
        message: "Profile updated successfully",
        user: updatedUser.rows[0],
      });
    } catch (error) {
      res.status(500).json({
        message: "Profile update failed",
        error: error.message,
      });
    }
  },
   // Get all users (admin only)
   getAllUsers: async (req, res) => {
    try {
      // Check if user is admin (you'll need to add an 'isAdmin' field to your Users table)
      // if (!req.user.isAdmin) {
      //   return res.status(403).json({ message: "Unauthorized: Admin access required" });
      // }

      const users = await db.query(
        "SELECT userid, email, name, number FROM Users"
      );

      res.json(users.rows);
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch users",
        error: error.message,
      });
    }
  },

  // Delete a user (admin only)
  deleteUser: async (req, res) => {
    try {
      if (!req.user.isAdmin) {
        return res.status(403).json({ message: "Unauthorized: Admin access required" });
      }

      const { userId } = req.params;

      const result = await db.query(
        "DELETE FROM Users WHERE userid = $1 RETURNING *",
        [userId]
      );

      if (result.rowCount === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({
        message: "Failed to delete user",
        error: error.message,
      });
    }
  },

  // Update user (admin can update any user, regular users can only update themselves)
  updateUser: async (req, res) => {
    try {
      const { userId } = req.params;
      const { email, name, number } = req.body;

      // Check permissions
      if (req.user.userId !== userId && !req.user.isAdmin) {
        return res.status(403).json({ message: "Unauthorized" });
      }

      // First get current user data
      const currentUser = await db.query(
        "SELECT * FROM Users WHERE userid = $1",
        [userId]
      );

      if (currentUser.rows.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      // Update only the fields that were provided
      const updateData = {
        email: email || currentUser.rows[0].email,
        name: name || currentUser.rows[0].name,
        number: number || currentUser.rows[0].number,
      };

      const updatedUser = await db.query(
        "UPDATE Users SET email = $1, name = $2, number = $3 WHERE userid = $4 RETURNING userid, email, name, number",
        [updateData.email, updateData.name, updateData.number, userId]
      );

      res.json({
        message: "User updated successfully",
        user: updatedUser.rows[0]
      });
    } catch (error) {
      res.status(500).json({
        message: "User update failed",
        error: error.message,
      });
    }
  }
};

module.exports = authController;
