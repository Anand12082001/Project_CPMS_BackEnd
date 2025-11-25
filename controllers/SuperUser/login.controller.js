// const StudentUser = require("../../models/user.model");
// // const bcrypt = require('bcrypt');
// const bcrypt = require("bcryptjs");

// const jwt = require('jsonwebtoken');

// const Login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await StudentUser.findOne({ email });
//     if (!user)
//       return res.status(400).json({ msg: "User Doesn't Exist!" });

//     const isMatch = await bcrypt.compare(password, user.password);
    
    
//     if (!isMatch || user.role !== "superuser")
//       return res.status(400).json({ msg: 'Credentials Not Matched!' });

//     const payload = { userId: user.id };
//     const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

//     user.token = token;
//     await user.save();

//     return res.json({ token });
//   } catch (error) {
//     console.log("admin.login.js => ", error);
//     return res.status(500).json({ msg: "Internal Server Error!" });
//   }
// }

// module.exports = Login;


// ----------------------------------------------------------

// const StudentUser = require("../../models/user.model");
// // const bcrypt = require('bcrypt');
// const bcrypt = require("bcryptjs");

// const jwt = require('jsonwebtoken');

// const Login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await StudentUser.findOne({ email });
//     if (!user)
//       return res.status(400).json({ msg: "User Doesn't Exist!" });

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch)
//       return res.status(400).json({ msg: 'Invalid Password!' });

//     if (user.role !== "admin" && user.role !== "superuser")
//       return res.status(400).json({ msg: 'Not Authorized!' });

//     const payload = { userId: user.id };
//     const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

//     user.token = token;
//     await user.save();

//     return res.json({ token });
//   } catch (error) {
//     console.log("admin.login.js => ", error);
//     return res.status(500).json({ msg: "Internal Server Error!" });
//   }
// }

// module.exports = Login;


// --------------------------------------------
const StudentUser = require("../../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const Login = async (req, res) => {
  const { email, password } = req.body;

  console.log("🔥 ADMIN LOGIN ATTEMPT:", email);

  try {
    const user = await StudentUser.findOne({ email });

    // If no user found
    if (!user) {
      console.log("❗ USER NOT FOUND");
      return res.status(400).json({ msg: "User Doesn't Exist!" });
    }

    console.log("✔ USER FOUND:", user.email);
    console.log("🔎 USER ROLE IN DB:", user.role);

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("DB PASS LENGTH:", user.password.length);
    console.log([...user.password]);

    console.log("📝 INPUT PASSWORD:", password);
    console.log("🔐 DB PASSWORD HASH:", user.password);
    console.log("🔎 PASSWORD MATCH RESULT:", isMatch);

    // If password wrong
    if (!isMatch) {
      console.log("❗ WRONG PASSWORD");
      return res.status(400).json({ msg: 'Invalid Password!' });
    }

    // Role validation
    if (user.role !== "superuser") {
      console.log("❗ WRONG ROLE — EXPECTED: superuser");
      return res.status(400).json({ msg: 'Not Authorized!' });
    }

    // JWT Token
    const payload = { userId: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    user.token = token;
    await user.save();

    console.log("🎉 LOGIN SUCCESS!");
    return res.json({ token });

  } catch (error) {
    console.log("❗ admin.login.js => ", error);
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
}

module.exports = Login;
