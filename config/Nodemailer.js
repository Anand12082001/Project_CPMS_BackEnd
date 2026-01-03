// // import nodemailer from "nodemailer";
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
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

const sendMail = async (to, subject, html) => {
  try {
    const accessToken = await oauth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_USER,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    const info = await transporter.sendMail({
      from: `"CPMS" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("✅ Gmail API email sent:", info.response);
  } catch (error) {
    console.error("❌ Gmail API error:", error);
    throw error;
  }
};

module.exports = sendMail;
