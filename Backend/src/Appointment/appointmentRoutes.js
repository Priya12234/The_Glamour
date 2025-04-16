const express = require("express");
const router = express.Router();
const appointmentController = require("./appointmentController");

// Enable CORS
router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

router.post("/", appointmentController.createAppointment);
router.get("/", appointmentController.getUserAppointments);
router.get("/adminalldata", appointmentController.getUserAppointmentsAdmin);
router.get("/:id", appointmentController.getAppointmentById);
router.put("/:id", appointmentController.updateAppointment);
router.delete("/:appointmentId", appointmentController.deleteAppointment);

module.exports = router;