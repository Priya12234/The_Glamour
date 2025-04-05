const express = require("express");
const router = express.Router();
const feedbackController = require("./feedbackController");
const { verifyToken } = require("../Auth/jwtUtils");

router.get("/displayed", feedbackController.getDisplayedFeedback);

// Verify token middleware
router.use(verifyToken);

// Create a new feedback 
router.post("/", feedbackController.createFeedback);


// Get all feedback statuses (admin view)
router.get("/", feedbackController.getAllFeedback);

// Get feedback status by ID
router.get("/:feedbackid", feedbackController.getFeedbackById);

// Get all feedback statuses for current user
router.get("/user/me", feedbackController.getUserFeedback);

// Update feedback status by ID
router.put("/:feedbackid", feedbackController.updateFeedback);

// Admin: Update feedback status by ID
router.put("/admin/:feedbackid", feedbackController.updateFeedbackStatus);

// Delete feedback by ID
router.delete("/:feedbackid", feedbackController.deleteFeedbackById);

module.exports = router;