const db = require("../DbConnections/db");

const appointmentController = {
  // Create a new appointment
  createAppointment: async (req, res) => {
    try {
      const { 
        name, 
        service, 
        date, 
        time, 
        details, 
        contact_email, 
        contact_phone 
      } = req.body;
      
      const userId = req.user.userId;

      // Validate required fields
      const requiredFields = { name, service, date, time };
      const missingFields = Object.entries(requiredFields)
        .filter(([_, value]) => !value)
        .map(([key]) => key);

      if (missingFields.length > 0) {
        return res.status(400).json({
          success: false,
          message: `Missing required fields: ${missingFields.join(', ')}`,
          missingFields
        });
      }

      // Validate time slot availability
      const existingAppointment = await db.query(
        `SELECT * FROM Appointments 
         WHERE date = $1 AND time = $2 
         AND userid != $3`,
        [date, time, userId]
      );

      if (existingAppointment.rows.length > 0) {
        return res.status(409).json({
          success: false,
          message: "This time slot is already booked",
          conflict: existingAppointment.rows[0]
        });
      }

      // Create appointment
      const newAppointment = await db.query(
        `INSERT INTO Appointments 
         (userid, name, service, date, time, details, contact_email, contact_phone) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
         RETURNING *`,
        [
          userId,
          name,
          service,
          date,
          time,
          details || null,
          contact_email || null,
          contact_phone || null
        ]
      );

      return res.status(201).json({
        success: true,
        message: "Appointment created successfully",
        appointment: newAppointment.rows[0]
      });

    } catch (error) {
      console.error("Appointment creation error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
  },

  // Get all appointments for a user
  getUserAppointments: async (req, res) => {
    try {
      const userId = req.user.userId;

      const appointments = await db.query(
        `SELECT 
          appointmentid, name, service, date, time, 
          details, contact_email, contact_phone,
          created_at, updated_at
         FROM Appointments 
         WHERE userid = $1 
         ORDER BY date ASC, time ASC`,
        [userId]
      );

      return res.status(200).json({
        success: true,
        count: appointments.rows.length,
        appointments: appointments.rows
      });

    } catch (error) {
      console.error("Get appointments error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch appointments",
        error: error.message
      });
    }
  },

  // Get single appointment by ID
  getUserAppointmentsById: async (req, res) => {
    try {
      const { appointmentId } = req.params;
      const userId = req.user.userId;

      const appointment = await db.query(
        `SELECT 
          appointmentid, name, service, date, time, 
          details, contact_email, contact_phone,
          created_at, updated_at
         FROM Appointments 
         WHERE userid = $1 AND appointmentid = $2`,
        [userId, appointmentId]
      );

      if (appointment.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Appointment not found"
        });
      }

      return res.json({
        success: true,
        appointment: appointment.rows[0]
      });

    } catch (error) {
      console.error("Get appointment by ID error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch appointment",
        error: error.message
      });
    }
  },

  // Update an appointment
  updateAppointment: async (req, res) => {
    try {
      const { appointmentId } = req.params;
      const { 
        name, 
        service, 
        date, 
        time, 
        details, 
        contact_email, 
        contact_phone 
      } = req.body;
      
      const userId = req.user.userId;

      // Verify appointment exists and belongs to user
      const existingAppointment = await db.query(
        `SELECT * FROM Appointments 
         WHERE appointmentid = $1 AND userid = $2`,
        [appointmentId, userId]
      );

      if (existingAppointment.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Appointment not found"
        });
      }

      // Check for time slot conflicts (excluding current appointment)
      if (date || time) {
        const checkDate = date || existingAppointment.rows[0].date;
        const checkTime = time || existingAppointment.rows[0].time;

        const conflictingAppointment = await db.query(
          `SELECT * FROM Appointments 
           WHERE date = $1 AND time = $2 
           AND userid = $3 
           AND appointmentid != $4`,
          [checkDate, checkTime, userId, appointmentId]
        );

        if (conflictingAppointment.rows.length > 0) {
          return res.status(409).json({
            success: false,
            message: "This time slot is already booked",
            conflict: conflictingAppointment.rows[0]
          });
        }
      }

      // Update appointment
      const updatedAppointment = await db.query(
        `UPDATE Appointments 
         SET 
           name = COALESCE($1, name),
           service = COALESCE($2, service),
           date = COALESCE($3, date),
           time = COALESCE($4, time),
           details = COALESCE($5, details),
           contact_email = COALESCE($6, contact_email),
           contact_phone = COALESCE($7, contact_phone),
           updated_at = NOW()
         WHERE appointmentid = $8
         RETURNING *`,
        [
          name,
          service,
          date,
          time,
          details,
          contact_email,
          contact_phone,
          appointmentId
        ]
      );

      return res.json({
        success: true,
        message: "Appointment updated successfully",
        appointment: updatedAppointment.rows[0]
      });

    } catch (error) {
      console.error("Update appointment error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to update appointment",
        error: error.message
      });
    }
  },

  // Delete an appointment
  deleteAppointment: async (req, res) => {
    try {
      const { appointmentId } = req.params;
      const userId = req.user.userId;

      // Verify appointment exists and belongs to user
      const existingAppointment = await db.query(
        `SELECT * FROM Appointments 
         WHERE appointmentid = $1 AND userid = $2`,
        [appointmentId, userId]
      );

      if (existingAppointment.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Appointment not found"
        });
      }

      await db.query(
        `DELETE FROM Appointments 
         WHERE appointmentid = $1`,
        [appointmentId]
      );

      return res.json({
        success: true,
        message: "Appointment deleted successfully"
      });

    } catch (error) {
      console.error("Delete appointment error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to delete appointment",
        error: error.message
      });
    }
  }
};

module.exports = appointmentController;