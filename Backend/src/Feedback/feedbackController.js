const db = require("../DbConnections/db");

const feedbackController = {
  // Create new feedback (only for authenticated users)
  createFeedback: async (req, res) => {
    try {
      // Verify user is authenticated
      if (!req.user || !req.user.userId) {
        return res.status(401).json({
          success: false,
          message: "Authentication required to submit feedback",
        });
      }

      const { feedback } = req.body; // Only feedback content is needed
      const userid = req.user.userId;

      // Validate required field
      if (!feedback) {
        return res.status(400).json({
          success: false,
          message: "Feedback content is required",
        });
      }

      // Get user details from database
      const userResult = await db.query(
        `SELECT email, name FROM Users WHERE userid = $1`,
        [userid]
      );

      if (userResult.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      const { email, name } = userResult.rows[0];
      const now = new Date();
      const date = now.toISOString().split('T')[0];
      const time = now.toTimeString().split(' ')[0];

      // Insert feedback into database
      const newFeedback = await db.query(
        `INSERT INTO Feedback 
         (userid, email, name, feedback, date, time, status) 
         VALUES ($1, $2, $3, $4, $5, $6, $7) 
         RETURNING *`,
        [userid, email, name, feedback, date, time, 'Hidden']
      );

      res.status(201).json({
        success: true,
        message: "Feedback submitted successfully",
        feedback: newFeedback.rows[0],
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to submit feedback",
        error: error.message,
      });
    }
  },

  // Get displayed feedback (public)
  getDisplayedFeedback: async (req, res) => {
    try {
      const result = await db.query(
        `SELECT feedbackid, feedback, name, date, time 
         FROM Feedback 
         WHERE status = 'Displayed'
         ORDER BY date DESC, time DESC
         LIMIT 10`
      );
      
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch displayed feedback",
        error: error.message,
      });
    }
  },

  // Get all feedback for current user
  getUserFeedback: async (req, res) => {
    try {
      const userid = req.user.userId;

      const feedback = await db.query(
        `SELECT feedbackid, feedback, status, date, time
         FROM Feedback
         WHERE userid = $1
         ORDER BY date DESC, time DESC`,
        [userid]
      );

      res.status(200).json({
        success: true,
        count: feedback.rows.length,
        feedback: feedback.rows,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch user feedback",
        error: error.message,
      });
    }
  },

  // Get feedback by ID (user-specific)
  getFeedbackById: async (req, res) => {
    try {
      const { feedbackid } = req.params;
      const userid = req.user.userId;

      const feedback = await db.query(
        `SELECT feedbackid, feedback, status, date, time
         FROM Feedback
         WHERE feedbackid = $1 AND userid = $2`,
        [feedbackid, userid]
      );

      if (feedback.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Feedback not found",
        });
      }

      res.status(200).json({
        success: true,
        feedback: feedback.rows[0],
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch feedback",
        error: error.message,
      });
    }
  },

  // Update feedback (user-specific)
  updateFeedback: async (req, res) => {
    try {
      const { feedbackid } = req.params;
      const { status } = req.body;
      const userid = req.user.userId;

      // Validate status
      const validStatuses = ["Displayed", "Hidden"];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Status must be either 'Displayed' or 'Hidden'",
        });
      }

      const updatedFeedback = await db.query(
        `UPDATE Feedback 
         SET status = $1 
         WHERE feedbackid = $2 AND userid = $3
         RETURNING feedbackid, status, date, time`,
        [status, feedbackid, userid]
      );

      if (updatedFeedback.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Feedback not found or not authorized",
        });
      }

      res.status(200).json({
        success: true,
        message: "Feedback updated successfully",
        feedback: updatedFeedback.rows[0],
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to update feedback",
        error: error.message,
      });
    }
  },

  // Admin: Get all feedback
  getAllFeedback: async (req, res) => {
    try {
      const feedback = await db.query(
        `SELECT f.feedbackid, f.userid, u.name, f.email, f.feedback, 
                f.status, f.date, f.time
         FROM Feedback f
         JOIN Users u ON f.userid = u.userid
         ORDER BY f.date DESC, f.time DESC`
      );

      res.status(200).json({
        success: true,
        count: feedback.rows.length,
        feedback: feedback.rows,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch all feedback",
        error: error.message,
      });
    }
  },

  // Admin: Update any feedback
  updateFeedbackStatus: async (req, res) => {
    try {
      const { feedbackid } = req.params;
      const { status } = req.body;

      // Validate status
      const validStatuses = ["Displayed", "Hidden"];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Status must be either 'Displayed' or 'Hidden'",
        });
      }

      const updatedFeedback = await db.query(
        `UPDATE Feedback 
         SET status = $1 
         WHERE feedbackid = $2
         RETURNING feedbackid, userid, status, date, time`,
        [status, feedbackid]
      );

      if (updatedFeedback.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Feedback not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Feedback status updated",
        feedback: updatedFeedback.rows[0],
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to update feedback status",
        error: error.message,
      });
    }
  },

  // Delete feedback (user-specific)
  deleteFeedbackById: async (req, res) => {
    try {
      const { feedbackid } = req.params;
      const userid = req.user.userId;

      const result = await db.query(
        "DELETE FROM Feedback WHERE feedbackid = $1 AND userid = $2 RETURNING *",
        [feedbackid, userid]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Feedback not found or not authorized",
        });
      }

      res.status(200).json({
        success: true,
        message: "Feedback deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to delete feedback",
        error: error.message,
      });
    }
  },
};

module.exports = feedbackController;