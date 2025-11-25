// run: node scripts/createAdmin.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
dotenv.config();

const Admin = require("../models/SuperUser.model"); // adjust path if model name differs
const connectDB = require("../config/MongoDB"); // your existing mongodb connection function

const createAdmin = async () => {
  try {
    await connectDB(); // call your DB connect function (if it returns a promise)
  } catch (err) {
    console.error("DB connect error:", err);
    process.exit(1);
  }

  const email = "admin@college.local";
  const password = "admin123";

  const existing = await Admin.findOne({ email });
  if (existing) {
    console.log("Admin already exists:", email);
    process.exit(0);
  }

  const hashed = await bcrypt.hash(password, 10);

  const admin = new Admin({
    name: "Super Admin",
    email,
    password: hashed
  });

  await admin.save();
  console.log("Created admin:", email, "password:", password);
  process.exit(0);
};

createAdmin().catch(err => { console.error(err); process.exit(1); });

// backend/scripts/createUsers.js


// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const bcrypt = require("bcryptjs");

// dotenv.config();
// const connectDB = require("../config/MongoDB"); // adjust path to your project DB connect function
// const AdminModel = require("../models/SuperUser.model"); // adjust to your model path
// // If your app uses a single "User" model, import that instead.

// async function run() {
//   try {
//     await connectDB(); // ensure this returns a promise and connects to Atlas
//     // create or update admin
//     const adminEmail = "admin@college.local";
//     const adminPassword = "admin123";

//     const hashedAdmin = await bcrypt.hash(adminPassword, 10);
//     await AdminModel.updateOne(
//       { email: adminEmail },
//       { $set: { name: "Super Admin", email: adminEmail, password: hashedAdmin, role: "admin" } },
//       { upsert: true }
//     );

//     // create TPO
//     const tpoEmail = "tpo@college.local";
//     const tpoPassword = "tpo123";
//     const hashedTpo = await bcrypt.hash(tpoPassword, 10);
//     await AdminModel.updateOne(
//       { email: tpoEmail },
//       { $set: { name: "TPO Officer", email: tpoEmail, password: hashedTpo, role: "tpo" } },
//       { upsert: true }
//     );

//     // create Management
//     const mgmtEmail = "management@college.local";
//     const mgmtPassword = "management123";
//     const hashedMgmt = await bcrypt.hash(mgmtPassword, 10);
//     await AdminModel.updateOne(
//       { email: mgmtEmail },
//       { $set: { name: "Management User", email: mgmtEmail, password: hashedMgmt, role: "management" } },
//       { upsert: true }
//     );

//     console.log("Seed complete");
//     process.exit(0);
//   } catch (err) {
//     console.error("Seed error:", err);
//     process.exit(1);
//   }
// }

// run();
