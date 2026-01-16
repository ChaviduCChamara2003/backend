const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendNotification = async (recipients, message) => {
  try {
    for (const recipient of recipients) {
      await transporter.sendMail({
        to: recipient,
        subject: "Notification from Document Tracking System",
        text: message,
      });
    }
  } catch (error) {
    console.error("Error sending notifications:", error.message);
    throw new Error("Failed to send notifications");
  }
};

module.exports = sendNotification;
