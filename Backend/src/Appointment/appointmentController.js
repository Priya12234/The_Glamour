const db = require("../DbConnections/db");

const appointmentController = {
  // Create a new appointment
  createAppointment: async (req, res) => {
    try {
      const { name, service, date, time } = req.body;
      const userId = req.user.userId; // From JWT token

      // Validate required fields
      if (!name || !service || !date || !time) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const newAppointment = await db.query(
        `INSERT INTO Appointments 
        (userid, name, service, date, time) 
        VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [userId, name, service, date, time]
      );

      res.status(201).json({
        message: "Appointment created successfully",
        appointment: newAppointment.rows[0],
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to create appointment",
        error: error.message,
      });
    }
  },

  // Get all appointments for a user
  getUserAppointments: async (req, res) => {
    try {
      const userId = req.user.userId;

      const appointments = await db.query(
        "SELECT * FROM Appointments WHERE userid = $1 ORDER BY date, time",
        [userId]
      );

      res.status(200).json({
        count: appointments.rows.length,
        appointments: appointments.rows,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch appointments",
        error: error.message,
      });
    }
  },

  getUserAppointmentsById: async (req, res) => {
    try {
      const { appointmentId } = req.params;
      const userId = req.user.userId;

      const appointmentsbyid = await db.query(
        "SELECT * FROM Appointments WHERE userid = $1 AND appointmentid = $2",
        [userId, appointmentId]
      );

      // Check if an appointment exists
      if (appointmentsbyid.rows.length === 0) {
        return res.status(404).json({ message: "Appointment not found" });
      }

      res.json({
        count: appointmentsbyid.rowCount, // No need for .length
        appointment: appointmentsbyid.rows[0], // Return the first matching appointment
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch appointment by ID",
        error: error.message,
      });
    }
  },

  // Update an appointment
  updateAppointment: async (req, res) => {
    try {
      const { appointmentId } = req.params;
      const { name, service, date, time } = req.body;
      const userId = req.user.userId;

      // Verify appointment belongs to user
      const existingAppointment = await db.query(
        "SELECT * FROM Appointments WHERE appointmentid = $1 AND userid = $2",
        [appointmentId, userId]
      );

      if (existingAppointment.rows.length === 0) {
        return res.status(404).json({ message: "Appointment not found" });
      }

      const updatedAppointment = await db.query(
        `UPDATE Appointments 
        SET name = $1, service = $2, date = $3, time = $4 
        WHERE appointmentid = $5 RETURNING *`,
        [name, service, date, time, appointmentId]
      );

      res.json({
        message: "Appointment updated successfully",
        appointment: updatedAppointment.rows[0],
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to update appointment",
        error: error.message,
      });
    }
  },

  // Delete an appointment
  deleteAppointment: async (req, res) => {
    try {
      const { appointmentId } = req.params;
      const userId = req.user.userId;

      // Verify appointment belongs to user
      const existingAppointment = await db.query(
        "SELECT * FROM Appointments WHERE appointmentid = $1 AND userid = $2",
        [appointmentId, userId]
      );

      if (existingAppointment.rows.length === 0) {
        return res.status(404).json({ message: "Appointment not found" });
      }

      await db.query("DELETE FROM Appointments WHERE appointmentid = $1", [
        appointmentId,
      ]);

      res.json({ message: "Appointment deleted successfully" });
    } catch (error) {
      res.status(500).json({
        message: "Failed to delete appointment",
        error: error.message,
      });
    }
  },
};

module.exports = appointmentController;