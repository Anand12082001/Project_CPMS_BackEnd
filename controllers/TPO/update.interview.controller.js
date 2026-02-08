const Job = require("../../models/job.model");

const UpdateInterview = async (req, res) => {
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

    res.status(200).json({ msg: "Interview scheduled" });
  } catch (err) {
    res.status(500).json({ msg: "Error", err });
  }
};

module.exports = UpdateInterview;
