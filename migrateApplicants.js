const mongoose = require("mongoose");
const Job = require("./models/job.model");
const Application = require("./models/application.model");

// 🔴 use SAME connection string as server.js
const MONGO_URI = "mongodb+srv://anandjayakumar0101_db_user:UjQ1Zff1gjWhCedi@anand1208.hfay4ae.mongodb.net/college-placement";

const migrate = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");

    const jobs = await Job.find({
      applicants: { $exists: true, $ne: [] },
    });

    console.log(`Found ${jobs.length} jobs with applicants`);

    let created = 0;

    for (const job of jobs) {
      for (const a of job.applicants) {
        const exists = await Application.findOne({
          job: job._id,
          student: a.studentId,
        });

        if (!exists) {
          await Application.create({
            job: job._id,
            student: a.studentId,
            status: a.status || "applied",
            createdAt: a.appliedAt || new Date(),
          });
          created++;
        }
      }
    }

    console.log(`Migration complete. Created ${created} applications`);
    process.exit();
  } catch (err) {
    console.error("Migration error:", err);
    process.exit(1);
  }
};

migrate();
