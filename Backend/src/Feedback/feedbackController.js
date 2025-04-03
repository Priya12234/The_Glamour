const db = require("../DbConnections/db");

const feedbackController = {
  // Create new feedback (just status)
  createFeedback: async (req, res) => {
    try {
      const { status } = req.body;
      const userid = req.user.userId;

      // Validate required fields
      if (!status) {
        return res.status(400).json({
          success: false,
          message: "Status is required",
        });
      }

      // Validate status values
      const validStatuses = ["Visible", "Hidden"];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Status must be either 'Displayed' or 'Hidden'",
        });
      }

      const newFeedback = await db.query(
        `INSERT INTO Feedback 
         (userid, status) 
         VALUES ($1, $2) 
         RETURNING *`,
        [userid, status]
      );

      res.status(201).json({
        success: true,
        message: "Feedback status set successfully",
        feedback: newFeedback.rows[0],
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to set feedback status",
        error: error.message,
      });
    }
  },

  // Get all feedback for current user (only status)
  getUserFeedback: async (req, res) => {
    try {
      const userid = req.user.userId;

      const feedback = await db.query(
        `SELECT *
         FROM Feedback
         WHERE userid = $1
         ORDER BY date DESC, time DESC`,
        [userid]
      );

      res.status(200).json({
        userid: userid,
        success: true,
        count: feedback.rows.length,
        feedback: feedback.rows,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch feedback status",
        error: error.message,
      });
    }
  },

  // Get feedback status by ID
  getFeedbackById: async (req, res) => {
    try {
      const { feedbackid } = req.params;
      const userid = req.user.userId;

      const feedback = await db.query(
        `SELECT feedbackid, status, date, time
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
        message: "Failed to fetch feedback status",
        error: error.message,
      });
    }
  },

  // Update feedback status
  updateFeedback: async (req, res) => {
    try {
      const { feedbackid } = req.params;
      const { status } = req.body;
      const userid = req.user.userId;

      // Validate required fields
      if (!status) {
        return res.status(400).json({
          success: false,
          message: "Status is required",
        });
      }

      // Validate status values
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
        message: "Feedback status updated successfully",
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

  // Admin: Get all feedback statuses
  getAllFeedback: async (req, res) => {
    try {
      const feedback = await db.query(
        `SELECT f.feedbackid, f.userid, f.status, f.date, f.time, u.name
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
        message: "Failed to fetch all feedback statuses",
        error: error.message,
      });
    }
  },

  // Admin: Update feedback status
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

  // Delete feedback by ID (user can only delete their own)
  deleteFeedbackById: async (req, res) => {
    try {
      const { feedbackid } = req.params;
      const userid = req.user.userid;

      // Check if feedback exists first
      const feedback = await db.query(
        "SELECT * FROM Feedback WHERE feedbackid = $1 AND userid = $2",
        [feedbackid, userid]
      );

      if (feedback.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Feedback not found or not authorized",
        });
      }

      // Delete feedback from the database
      await db.query(
        "DELETE FROM Feedback WHERE feedbackid = $1 AND userid = $2",
        [feedbackid, userid]
      );

      res.status(200).json({
        success: true,
        message: "Feedback deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to delete feedback by ID",
        error: error.message,
      });
    }
  },
};

module.exports = feedbackController;