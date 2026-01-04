
// const nodemailer = require("nodemailer");
// require("dotenv").config();

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   }
// });

// const sendMail = async (to, subject, html) => {
//   const mailOptions = {
//     from: `"CPMS" ${process.env.EMAIL_USER}`,
//     to,
//     subject,
//     html
//   };

//   try {
//     const info = await transporter.sendMail(mailOptions);
//     return info;
//   } catch (error) {
//     console.log("Error sending email: ", error);
//   }
// };

// module.exports = sendMail;

/////-----------------------------------------------------------------------------------------------
// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   host: "smtp.sendgrid.net",
//   port: 587,
//   secure: false,
//   auth: {
//     user: "apikey", // MUST be the word "apikey"
//     pass: process.env.SENDGRID_API_KEY,
//   },
// });

// const sendMail = async (to, subject, html) => {
//   try {
//     await transporter.sendMail({
//       from: `"CPMS" <${process.env.SENDGRID_FROM_EMAIL}>`,
//       to,
//       subject,
//       html,
//     });
//     console.log("✅ Email sent via SendGrid SMTP");
//   } catch (err) {
//     console.error("❌ SendGrid SMTP error:", err);
//     throw err;
//   }
//   console.log("API KEY EXISTS:", !!process.env.SENDGRID_API_KEY);
// console.log("FROM EMAIL:", process.env.SENDGRID_FROM_EMAIL);

// };

// module.exports = sendMail;
// ---------------------------------------------------------------
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = async (to, subject, html) => {
  try {
    await sgMail.send({
      to,
      from: process.env.SENDGRID_FROM_EMAIL, // must be verified in SendGrid
      subject,
      html,
    });

    console.log("✅ Email sent via SendGrid API");
    console.log("API KEY EXISTS:", !!process.env.SENDGRID_API_KEY);
    console.log("FROM EMAIL:", process.env.SENDGRID_FROM_EMAIL);

  } catch (error) {
    console.error(
      "❌ SendGrid API error:",
      error.response?.body || error.message
    );
    throw error;
  }
};

module.exports = sendMail;

