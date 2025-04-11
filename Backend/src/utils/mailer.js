const nodemailer = require('nodemailer');

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Email template for appointment cancellation
const cancellationEmail = (recipient, appointmentDetails, reason) => ({
    from: `"${process.env.EMAIL_SENDER_NAME || 'Appointment System'}" <${process.env.EMAIL_USER}>`,
    to: recipient,
    subject: 'Appointment Cancellation Notification',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #dc3545;">Appointment Cancellation</h2>
        <p>Dear ${appointmentDetails.name},</p>
        <p>Your appointment has been cancelled with the following details:</p>
        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
          <p><strong>Service:</strong> ${appointmentDetails.service}</p>
          <p><strong>Date:</strong> ${appointmentDetails.date}</p>
          <p><strong>Time:</strong> ${appointmentDetails.time}</p>
          ${reason ? `<p><strong>Cancellation Reason:</strong> ${reason}</p>` : ''}
        </div>
        <p>We apologize for any inconvenience this may cause. Please feel free to book a new appointment at your convenience.</p>
        <p>Best regards,</p>
        <p>The Appointment Team</p>
      </div>
    `
  });

// Email template for appointment rescheduling
const postponementEmail = (recipient, appointmentDetails, newDate, newTime) => ({
  from: `"${process.env.EMAIL_SENDER_NAME || 'Appointment System'}" <${process.env.EMAIL_USER}>`,
  to: recipient,
  subject: 'Appointment Rescheduled Notification',
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #17a2b8;">Appointment Rescheduled</h2>
      <p>Dear ${appointmentDetails.name},</p>
      <p>Your appointment has been rescheduled. Here are the details:</p>
      
      <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
        <h4 style="margin-top: 0;">Original Appointment</h4>
        <p><strong>Service:</strong> ${appointmentDetails.service}</p>
        <p><strong>Date:</strong> ${appointmentDetails.date}</p>
        <p><strong>Time:</strong> ${appointmentDetails.time}</p>
        
        <h4>New Appointment</h4>
        <p><strong>New Date:</strong> ${newDate}</p>
        <p><strong>New Time:</strong> ${newTime}</p>
      </div>
      
      <p>If this change doesn't work for you or if you need to make any adjustments, please don't hesitate to contact us.</p>
      <p>Best regards,</p>
      <p>The Appointment Team</p>
    </div>
  `
});

// Email template for new appointment confirmation
const confirmationEmail = (recipient, appointmentDetails) => ({
  from: `"${process.env.EMAIL_SENDER_NAME || 'Appointment System'}" <${process.env.EMAIL_USER}>`,
  to: recipient,
  subject: 'Appointment Confirmation',
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #28a745;">Appointment Confirmed</h2>
      <p>Dear ${appointmentDetails.name},</p>
      <p>Your appointment has been successfully scheduled with the following details:</p>
      <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
        <p><strong>Service:</strong> ${appointmentDetails.service}</p>
        <p><strong>Date:</strong> ${appointmentDetails.date}</p>
        <p><strong>Time:</strong> ${appointmentDetails.time}</p>
        ${appointmentDetails.details ? `<p><strong>Additional Details:</strong> ${appointmentDetails.details}</p>` : ''}
      </div>
      <p>We look forward to seeing you. If you need to make any changes to your appointment, please contact us in advance.</p>
      <p>Best regards,</p>
      <p>The Appointment Team</p>
    </div>
  `
});

module.exports = {
  transporter,
  cancellationEmail,
  postponementEmail,
  confirmationEmail
};