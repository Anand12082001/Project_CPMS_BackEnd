// const Users = require('../../models/user.model');
// // const bcrypt = require('bcrypt');
// const bcrypt = require("bcrypt");

// const sendMail = require("../../config/Nodemailer");
const emailTemplate = require("../../utlis/emailTemplates");
const generatePassword = require('../../utlis/generatePassword');

// const AddTPO = async (req, res) => {
//   const { email, first_name, number } = req.body;

//   try {
//     if (await Users.findOne({ email }))
//       return res.json({ msg: "User Already Exists!" });

//     const password = generatePassword();

//     const hashPassword = await bcrypt.hash(password, 10);

//     Users.create({ first_name, email, number, password: hashPassword, role: "tpo_admin" });

//     const html = emailTemplate({
//       role: "TPO",
//       name: first_name,
//       email: email,
//       password: password
//     });
//     const subject = "Welcome to CPMS | Your Login Credentials as a TPO";

//     await sendMail(email, subject, html);

//     return res.json({ msg: "User Created!" });
//   } catch (error) {
//     console.log("management-user-add-tpo => ", error);
//     return res.json({ msg: "Internal Server Error!" });
//   }
// }

// const AddManagement = async (req, res) => {
//   const { email, first_name, number } = req.body;

//   try {
//     if (await Users.findOne({ email }))
//       return res.json({ msg: "User Already Exists!" });

//     const password = generatePassword();

//     const hashPassword = await bcrypt.hash(password, 10);

//     Users.create({ first_name, email, number, password: hashPassword, role: "management_admin" });

//     const html = emailTemplate({
//       role: "Management",
//       name: first_name,
//       email: email,
//       password: password
//     });
//     const subject = "Welcome to CPMS | Your Login Credentials as a Management";

//     await sendMail(email, subject, html);
//     return res.json({ msg: "User Created!" });
//   } catch (error) {
//     console.log("management-user-add-management => ", error);
//     return res.json({ msg: "Internal Server Error!" });
//   }
// }

// const AddStudent = async (req, res) => {
//   const { email, first_name, number } = req.body;

//   try {
//     if (await Users.findOne({ email }))
//       return res.json({ msg: "User Already Exists!" });

//     const password = generatePassword();

//     const hashPassword = await bcrypt.hash(password, 10);

//     Users.create({ first_name, email, number, password: hashPassword, role: "student", "studentProfile.isApproved": true });

//     const html = emailTemplate({
//       role: "Student",
//       name: first_name,
//       email: email,
//       password: password
//     });
//     const subject = "Welcome to CPMS | Your Login Credentials as a Student";

//     await sendMail(email, subject, html);

//     return res.json({ msg: "User Created!" });
//   } catch (error) {
//     console.log("management-user-add-management => ", error);
//     return res.json({ msg: "Internal Server Error!" });
//   }
// }

// module.exports = {
//   AddTPO,
//   AddManagement,
//   AddStudent
// };
const Users = require('../../models/user.model');
const bcrypt = require("bcrypt");

const sendMail = require("../../config/Nodemailer");

// const emailTemplate = require("../../utils/emailTemplates");
// const generatePassword = require("../../utils/generatePassword

// ================= ADD TPO =================
const AddTPO = async (req, res) => {
  const { email, first_name, number } = req.body;

  try {
    if (await Users.findOne({ email })) {
      return res.json({ msg: "User Already Exists!" });
    }

    const password = generatePassword();
    const hashPassword = await bcrypt.hash(password, 10);

    // 🔴 FIX 1: AWAIT USER CREATION
    await Users.create({
      first_name,
      email,
      number,
      password: hashPassword,
      role: "tpo_admin"
    });

    const html = emailTemplate({
      role: "TPO",
      name: first_name,
      email,
      password
    });

    const subject = "Welcome to CPMS | Your Login Credentials as a TPO";

    // 🔴 FIX 2: EMAIL AFTER DB WRITE
    await sendMail(email, subject, html);

    return res.json({ msg: "User Created & Email Sent!" });

  } catch (error) {
    console.log("add-tpo => ", error);
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
};

// ================= ADD MANAGEMENT =================
const AddManagement = async (req, res) => {
  const { email, first_name, number } = req.body;

  try {
    if (await Users.findOne({ email })) {
      return res.json({ msg: "User Already Exists!" });
    }

    const password = generatePassword();
    const hashPassword = await bcrypt.hash(password, 10);

    // 🔴 FIX 1
    await Users.create({
      first_name,
      email,
      number,
      password: hashPassword,
      role: "management_admin"
    });

    const html = emailTemplate({
      role: "Management",
      name: first_name,
      email,
      password
    });

    const subject = "Welcome to CPMS | Your Login Credentials as a Management";

    // 🔴 FIX 2
    await sendMail(email, subject, html);

    return res.json({ msg: "User Created & Email Sent!" });

  } catch (error) {
    console.log("add-management => ", error);
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
};

// ================= ADD STUDENT =================
const AddStudent = async (req, res) => {
  const { email, first_name, number } = req.body;
 console.log("🔥 ADD USER API HIT");

  try {
    if (await Users.findOne({ email })) {
      return res.json({ msg: "User Already Exists!" });
    }

    const password = generatePassword();
    const hashPassword = await bcrypt.hash(password, 10);

    // 🔴 FIX 1
    await Users.create({
      first_name,
      email,
      number,
      password: hashPassword,
      role: "student",
      studentProfile: { isApproved: true }
    });

    const html = emailTemplate({
      role: "Student",
      name: first_name,
      email,
      password
    });

    const subject = "Welcome to CPMS | Your Login Credentials as a Student";

    // 🔴 FIX 2
    await sendMail(email, subject, html);

    return res.json({ msg: "User Created & Email Sent!" });

  } catch (error) {
    console.log("add-student => ", error);
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
};

module.exports = {
  AddTPO,
  AddManagement,
  AddStudent
};
