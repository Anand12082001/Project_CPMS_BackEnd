const express = require('express');
const cors = require('cors');
const path = require("path");

const app = express();

app.use(express.json());
const fetch = require("node-fetch");

app.get("/resume-view", async (req, res) => {
  try {
    const { url } = req.query;

    const response = await fetch(url);
    const buffer = await response.arrayBuffer();

    res.setHeader("Content-Type", "application/pdf");
    res.send(Buffer.from(buffer));
  } catch (err) {
    console.log(err);
    res.status(500).send("Cannot open resume");
  }
});

app.use(cors());

// public folder for users profile
app.use('/profileImgs', express.static(path.join(__dirname, 'public/profileImgs')));
app.use('/resume', express.static(path.join(__dirname, 'public/resumes')));
app.use('/offerLetter', express.static(path.join(__dirname, 'public/offerLetter')));

// database import 
const mongodb = require('./config/MongoDB');
mongodb();

// routes for user
app.use('/user', require('./routes/user.route'));
// routes for student user
app.use('/student', require('./routes/student.route'));
// routes for tpo user
app.use('/tpo', require('./routes/tpo.route'));
// routes for management user
app.use('/management', require('./routes/management.route'));
// routes for admin user
app.use('/admin', require('./routes/superuser.route'));
// route for company
app.use('/company', require('./routes/company.route'));

// ✅ Add this route
app.get('/', (req, res) => {
  res.send('🚀 College Placement Management System Backend is Running Successfully!');
});

app.listen(process.env.PORT, () => {
  console.log(`server is running in http://localhost:${process.env.PORT}`);
});
