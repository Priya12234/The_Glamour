const db = require("../DbConnections/db");
const { transporter, cancellationEmail, postponementEmail, confirmationEmail } = require("../utils/mailer");

function convertTo24HourFormat(timeStr) {
  if (!timeStr) return timeStr;

  // If already in 24-hour format and no AM/PM, return as is
  if (!timeStr.includes("AM") && !timeStr.includes("PM")) return timeStr;

  const [timePart, modifier] = timeStr.split(" ");
  let [hours, minutes] = timePart.split(":").map(Number);

  if (modifier === "PM" && hours < 12) {
    hours += 12;
  }
  if (modifier === "AM" && hours === 12) {
    hours = 0;
  }

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`;
}

const appointmentController = {
  createAppointment: async (req, res) => {
    try {
      const { name, service, date, time, details, contact_email, contact_phone } = req.body;

      if (!name || !service || !date || !time) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields (name, service, date, time)"
        });
      }

      const fixedTime = convertTo24HourFormat(time);

      const existing = await db.query(
        "SELECT * FROM Appointments WHERE date = $1 AND time = $2",
        [date, fixedTime]
      );

      if (existing.rows.length > 0) {
        return res.status(409).json({
          success: false,
          message: "Time slot already booked"
        });
      }

      const newAppt = await db.query(
        `INSERT INTO Appointments (name, service, date, time, details, contact_email, contact_phone)
         VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        [name, service, date, fixedTime, details, contact_email, contact_phone]
      );

      if (contact_email) {
        try {
          await transporter.sendMail(
            confirmationEmail(contact_email, { 
              name, 
              service, 
              date, 
              time: `${time}`, 
              details 
            })
          );
        } catch (emailError) {
          console.error("Email send error:", emailError);
        }
      }

      res.status(201).json({
        success: true,
        appointment: newAppt.rows[0]
      });

    } catch (error) {
      console.error("Create appointment error:", error);
      res.status(500).json({
        success: false,
        message: "Server error creating appointment",
        error: error.message
      });
    }
  },

  getUserAppointments: async (req, res) => {
    try {
      const result = await db.query(
        "SELECT * FROM Appointments ORDER BY date, time"
      );
      res.json({
        success: true,
        appointments: result.rows
      });
    } catch (error) {
      console.error("Get appointments error:", error);
      res.status(500).json({
        success: false,
        message: "Server error fetching appointments",
        error: error.message
      });
    }
  },

  getUserAppointmentsAdmin: async (req, res) => {
    try {
      const result = await db.query(
        `SELECT appointmentid, name, service, TO_CHAR(date, 'YYYY-MM-DD') as date, 
         time, contact_email, contact_phone
         FROM Appointments ORDER BY date, time`
      );
      res.json({
        success: true,
        appointments: result.rows
      });
    } catch (error) {
      console.error("Get admin appointments error:", error);
      res.status(500).json({
        success: false,
        message: "Server error fetching admin appointments",
        error: error.message
      });
    }
  },

  getAppointmentById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await db.query(
        "SELECT * FROM Appointments WHERE appointmentid = $1", 
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Appointment not found"
        });
      }

      res.json({
        success: true,
        appointment: result.rows[0]
      });
    } catch (error) {
      console.error("Get appointment error:", error);
      res.status(500).json({
        success: false,
        message: "Server error fetching appointment",
        error: error.message
      });
    }
  },

  updateAppointment: async (req, res) => {
    try {
      const { id } = req.params;
      const { date, time } = req.body;

      if (!date || !time) {
        return res.status(400).json({
          success: false,
          message: "Date and time are required fields"
        });
      }

      const fixedTime = convertTo24HourFormat(time);

      // Check if the new time slot is available
      const existing = await db.query(
        `SELECT * FROM Appointments 
         WHERE date = $1 AND time = $2 AND appointmentid != $3`,
        [date, fixedTime, id]
      );

      if (existing.rows.length > 0) {
        return res.status(409).json({
          success: false,
          message: "The selected time slot is already booked"
        });
      }

      // Get current appointment data for email notification
      const currentAppointment = await db.query(
        "SELECT * FROM Appointments WHERE appointmentid = $1",
        [id]
      );

      if (currentAppointment.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Appointment not found"
        });
      }

      const result = await db.query(
        `UPDATE Appointments
         SET date = $1, time = $2
         WHERE appointmentid = $3
         RETURNING *`,
        [date, fixedTime, id]
      );

      const updatedAppointment = result.rows[0];

      // Send email notification if contact_email exists
      if (updatedAppointment.contact_email) {
        try {
          await transporter.sendMail(
            postponementEmail(updatedAppointment.contact_email, {
              name: updatedAppointment.name,
              service: updatedAppointment.service,
              oldDate: currentAppointment.rows[0].date,
              oldTime: currentAppointment.rows[0].time,
              newDate: date,
              newTime: time
            })
          );
        } catch (emailError) {
          console.error("Postponement email error:", emailError);
        }
      }

      res.json({
        success: true,
        appointment: updatedAppointment,
        message: "Appointment updated successfully"
      });

    } catch (error) {
      console.error('Error updating appointment:', error);
      res.status(500).json({
        success: false,
        message: "Server error updating appointment",
        error: error.message
      });
    }
  },

  deleteAppointment: async (req, res) => {
    try {
      const { appointmentId } = req.params;
      const { reason } = req.body || {};

      const existing = await db.query(
        "SELECT * FROM Appointments WHERE appointmentid = $1",
        [appointmentId]
      );

      if (existing.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Appointment not found"
        });
      }

      const appointment = existing.rows[0];
      
      if (appointment.contact_email) {
        try {
          await transporter.sendMail(
            cancellationEmail(appointment.contact_email, {
              name: appointment.name,
              service: appointment.service,
              date: appointment.date,
              time: appointment.time
            }, reason || "No reason provided")
          );
        } catch (emailError) {
          console.error("Cancellation email error:", emailError);
        }
      }

      await db.query(
        "DELETE FROM Appointments WHERE appointmentid = $1", 
        [appointmentId]
      );

      res.json({
        success: true,
        message: "Appointment deleted successfully"
      });

    } catch (error) {
      console.error("Delete appointment error:", error);
      res.status(500).json({
        success: false,
        message: "Server error deleting appointment",
        error: error.message
      });
    }
  }
};

module.exports = appointmentController;