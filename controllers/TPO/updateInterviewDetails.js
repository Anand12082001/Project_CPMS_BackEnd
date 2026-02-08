const Job = require("../../models/job.model");

const updateInterviewDetails = async (req, res) => {
  try {
    const { jobId, studentId } = req.params;
    const { interviewMode, interviewTime, interviewLink, interviewAddress } = req.body;

    const job = await Job.findById(jobId);

    const applicant = job.applicants.find(
      (a) => a.studentId.toString() === studentId
    );

    applicant.interviewMode = interviewMode;
    applicant.interviewTime = interviewTime;
    applicant.interviewLink = interviewLink;
    applicant.interviewAddress = interviewAddress;

    await job.save();

    res.json({ msg: "Interview updated" });
  } catch (err) {
    res.status(500).json({ msg: "Error", err });
  }
};

module.exports = updateInterviewDetails;
