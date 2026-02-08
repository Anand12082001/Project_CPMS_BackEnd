const User = require("../../models/user.model");
const Job = require("../../models/job.model");
const Application = require("../../models/application.model");

/**
 * Student applies for a job
 */
const AppliedToJob = async (req, res) => {
  try {
    const { jobId, studentId } = req.params;

    if (!jobId || !studentId) {
      return res.status(400).json({ msg: "Invalid request" });
    }

    const user = await User.findById(studentId);
    const job = await Job.findById(jobId);

    if (!user || !job) {
      return res.status(404).json({ msg: "User or Job not found" });
    }

    // 🔴 CHECK APPLICATION COLLECTION (NOT job.applicants)
    const alreadyApplied = await Application.findOne({
      job: jobId,
      student: studentId,
    });

    if (alreadyApplied) {
      return res.json({ msg: "Already Applied!" });
    }

    if (!user.studentProfile?.resume) {
      return res.json({
        msg: 'Please upload resume first (Placement Profile)',
      });
    }

    // ✅ CREATE APPLICATION (THIS IS THE KEY)
    const application = new Application({
      job: jobId,
      student: studentId,
      appliedAt: new Date(),
      finalStatus: "applied",
    });

    await application.save();

    // ✅ OPTIONAL (for backward compatibility)
    job.applicants.push({
      studentId,
      status: "applied",
      appliedAt: new Date(),
    });

    user.studentProfile.appliedJobs.push({
      jobId,
      status: "applied",
    });

    await job.save();
    await user.save();

    return res.status(201).json({ msg: "Applied Successfully!" });
  } catch (error) {
    console.log("AppliedToJob error =>", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
/**
 * Check if student already applied for a job
 */
const CheckAlreadyApplied = async (req, res) => {
  try {
    const { studentId, jobId } = req.params;

    const applied = await Application.findOne({
      student: studentId,
      job: jobId,
    });

    return res.json({ applied: !!applied });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ applied: false });
  }
};


module.exports = {
  AppliedToJob,
  CheckAlreadyApplied,
};
