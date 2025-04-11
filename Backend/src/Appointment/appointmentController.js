const db = require("../DbConnections/db");
const { transporter, cancellationEmail, postponementEmail, confirmationEmail } = require("../utils/mailer");

const appointmentController = {
  // Create a new appointment with email confirmation
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
          contact_email,
          contact_phone
        ]
      );

      // Send confirmation email if email was provided
      if (contact_email) {
        try {
          const mailOptions = confirmationEmail(
            contact_email,
            {
              name,
              service,
              date,
              time,
              details
            }
          );

          await transporter.sendMail(mailOptions);
        } catch (emailError) {
          console.error("Failed to send confirmation email:", emailError);
          // Don't fail the whole request if email fails
        }
      }

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

  // Get all appointments for admin
  getUserAppointmentsAdmin: async (req, res) => {
    try {
      let query = await db.query(
        `SELECT 
          appointmentid,
          userid,
          name,
          service,
          TO_CHAR(date, 'YYYY-MM-DD') as date,
          time,
          contact_email,
          contact_phone
        FROM Appointments 
        ORDER BY date, time` 
      );
      
      res.status(200).json({
        success: true,
        appointments: query.rows
      });
  
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch appointments",
        error: error.message
      });
    }
  },

  // Get user appointments
  getUserAppointments: async (req, res) => {
    try {
      const userId = req.user.userId;
      const { date } = req.query;

      let query = `
        SELECT *
        FROM Appointments 
        WHERE userid = $1
      `;
      
      let params = [userId];
      
      if (date) {
        query += ` AND date = $2`;
        params.push(date);
      }

      query += ` ORDER BY date ASC, time ASC`;

      const result = await db.query(query, params);

      return res.status(200).json({
        success: true,
        appointments: result.rows
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
  getAppointmentById: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.userId;

      const appointment = await db.query(
        `SELECT 
          appointmentid, name, service, date, time, 
          details, contact_email, contact_phone,
          created_at, updated_at
         FROM Appointments 
         WHERE appointmentid = $1 AND userid = $2`,
        [id, userId]
      );

      if (appointment.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Appointment not found"
        });
      }

      return res.status(200).json({
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

  // Update an appointment with optional email notification
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

      // Send reschedule notification if date/time changed and email exists
      if ((date || time) && (contact_email || existingAppointment.rows[0].contact_email)) {
        try {
          const mailOptions = postponementEmail(
            contact_email || existingAppointment.rows[0].contact_email,
            {
              name: name || existingAppointment.rows[0].name,
              service: service || existingAppointment.rows[0].service,
              date: existingAppointment.rows[0].date,
              time: existingAppointment.rows[0].time
            },
            date || existingAppointment.rows[0].date,
            time || existingAppointment.rows[0].time
          );

          await transporter.sendMail(mailOptions);
        } catch (emailError) {
          console.error("Failed to send reschedule email:", emailError);
          // Don't fail the whole request if email fails
        }
      }

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

  // Delete an appointment with cancellation email
  deleteAppointment: async (req, res) => {
    try {
      const { appointmentId } = req.params;
      const { reason } = req.body;
  
      // Step 1: Check if appointment exists
      const existingAppointment = await db.query(
        `SELECT * FROM Appointments WHERE appointmentid = $1`,
        [appointmentId]
      );
  
      if (existingAppointment.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Appointment not found"
        });
      }
  
      const appointment = existingAppointment.rows[0];
  
      // Step 2: Send cancellation email if email exists
      if (appointment.contact_email) {
        const mailOptions = cancellationEmail(
          appointment.contact_email,
          {
            name: appointment.name,
            service: appointment.service,
            date: appointment.date,
            time: appointment.time
          },
          reason || "No reason provided"
        );
  
        try {
          await transporter.sendMail(mailOptions);
          console.log(`Cancellation email sent to ${appointment.contact_email}`);
        } catch (emailError) {
          console.error("Failed to send cancellation email:", emailError);
          return res.status(500).json({
            success: false,
            message: "Failed to send cancellation email. Appointment not deleted.",
            error: emailError.message
          });
        }
      }
  
      // Step 3: Delete appointment after email is sent
      await db.query(
        `DELETE FROM Appointments WHERE appointmentid = $1`,
        [appointmentId]
      );
  
      return res.json({
        success: true,
        message: "Appointment deleted successfully and notification sent"
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