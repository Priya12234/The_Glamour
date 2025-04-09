const express = require("express");
const router = express.Router();
const appointmentController = require("./appointmentController");
const { verifyToken } = require("../Auth/jwtUtils");

// Apply JWT verification to all appointment routes
router.use(verifyToken);

// Create appointment
router.post("/", appointmentController.createAppointment);

// Get all appointments
router.get("/", appointmentController.getUserAppointments);
router.get("/adminalldata", appointmentController.getUserAppointmentsAdmin);

// Get single appointment by ID
router.get("/:id", appointmentController.getAppointmentById);

// Update appointment
router.put("/:appointmentId", appointmentController.updateAppointment);

// Delete appointment
router.delete("/:appointmentId", appointmentController.deleteAppointment);


module.exports = router;