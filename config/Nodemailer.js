// import nodemailer from "nodemailer";
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
});

const sendMail = async (to, subject, html) => {
  const mailOptions = {
    from: `"CPMS" ${process.env.EMAIL_USER}`,
    to,
    subject,
    html
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.log("Error sending email: ", error);
  }
};

module.exports = sendMail;