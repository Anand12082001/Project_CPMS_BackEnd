const Application = require("../../models/application.model");

const UpdateInterview = async (req, res) => {
  try {
    const { appId } = req.params;

    const {
      currentRound,
      roundStatus,
      status,
      interviewMode,
      interviewTime,
      interviewLink,
      interviewAddress,
    } = req.body;

    const application = await Application.findById(appId);
    if (!application)
      return res.status(404).json({ msg: "Application not found" });

    // 🔐 VALIDATION
    if (status === "interview") {
      if (!currentRound || !roundStatus || !interviewMode || !interviewTime)
        return res.status(400).json({ msg: "Missing interview details" });

      if (
        interviewMode === "online" &&
        !interviewLink
      )
        return res.status(400).json({ msg: "Interview link required" });

      if (
        interviewMode === "offline" &&
        !interviewAddress
      )
        return res.status(400).json({ msg: "Interview address required" });
    }

    // ✅ UPDATE APPLICATION
    application.currentRound = currentRound;
    application.roundStatus = roundStatus;
    application.finalStatus = status;

    application.interviewMode = interviewMode;
    application.interviewTime = interviewTime;
    application.interviewLink = interviewLink;
    application.interviewAddress = interviewAddress;

    await application.save();

    res.json({ msg: "Application updated successfully" });
  } catch (err) {
    console.log("UpdateInterview error => ", err);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = UpdateInterview;
