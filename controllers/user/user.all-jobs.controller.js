const User = require("../../models/user.model");
const Job = require("../../models/job.model");
const Application = require("../../models/application.model");

const AllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    return res.json({ data: jobs });
  } catch (error) {
    return res.status(500).json({ msg: "Server Error" });
  }
};
const GetApplicationTracker = async (req, res) => {
  try {
    const { jobId, studentId } = req.params;

    const application = await Application.findOne({
      job: jobId,
      student: studentId,
    }).populate("job").populate("student");

    if (!application) {
      return res.status(404).json({ msg: "Application not found" });
    }

    res.json(application);
  } catch (err) {
    console.log("Tracker error => ", err);
    res.status(500).json({ msg: "Server error" });
  }
};

const DeleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.body.jobId);
    await job.deleteOne();
    return res.status(200).json({ msg: "Job deleted successfully!" });
  } catch (error) {
    return res.status(500).json({ msg: "Server Error" });
  }
};

const JobData = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    res.json(job);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching job data" });
  }
};

/* ✅ THE REAL FIX IS HERE */
 const JobWithApplicants = async (req, res) => {
  try {
    const { jobId } = req.params;

    // 1️⃣ Load job WITH applicants (this has appliedAt)
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ msg: "Job not found" });
    }

    // 2️⃣ Load applications for interview-related fields
    const applications = await Application.find({ job: jobId }).populate({
      path: "student",
      select: "first_name email studentProfile",
    });

    // 3️⃣ Merge JOB.applicants + Application data
    const applicantsList = applications.map((app) => {
      const applicantEntry = job.applicants.find(
        (a) => String(a.studentId) === String(app.student._id)
      );

      return {
        // IDs
        applicantId: app._id,
        studentId: app.student._id,

        // Student info
        name: app.student.first_name,
        email: app.student.email,
        resume: app.student.studentProfile?.resume || "",
        rollNo: app.student.studentProfile?.rollNumber || "",
        year: app.student.studentProfile?.year || "",

        // ✅ APPLIED AT — FROM JOB COLLECTION (YOUR REQUIREMENT)
        appliedAt: applicantEntry?.appliedAt || app.appliedAt || null,


        // Interview tracking (Application collection)
        currentRound: app.currentRound || "",
        roundStatus: app.roundStatus || "",
        status: app.finalStatus || applicantEntry?.status || "applied",

        interviewMode: app.interviewMode || "",
        interviewTime: app.interviewTime || null,
        interviewLink: app.interviewLink || "",
        interviewAddress: app.interviewAddress || "",
      };
    });

    res.json({ applicantsList });
  } catch (err) {
    console.log("JobWithApplicants error => ", err);
    res.status(500).json({ msg: "Server Error" });
  }
};

const StudentJobsApplied = async (req, res) => {
  try {
    const studentId = req.params.studentId;

    // 1️⃣ Find all jobs where this student applied
    const jobs = await Job.find({
      "applicants.studentId": studentId,
    })
      .populate("company", "companyName")
      .lean();

    const result = jobs.map((job) => {
      // 2️⃣ Find THIS student's applicant entry
      const applicantEntry = job.applicants.find(
        (a) => String(a.studentId) === String(studentId)
      );

      return {
        jobId: job._id,
        jobTitle: job.jobTitle,
        salary: job.salary,
        companyName: job.company?.companyName || "-",

        // ✅ APPLIED AT — FROM JOB COLLECTION
       appliedAt: applicantEntry?.appliedAt || application?.appliedAt || null,


        applicationDeadline: job.applicationDeadline,

        status: applicantEntry?.status || "applied",

        numberOfApplicants: job.applicants.length,
      };
    });

    res.json(result);
  } catch (err) {
    console.log("StudentJobsApplied error => ", err);
    res.status(500).json({ msg: "Server error" });
  }
};





module.exports = {
  AllJobs,
  DeleteJob,
  JobData,
  JobWithApplicants,
  StudentJobsApplied,
  GetApplicationTracker,

};
