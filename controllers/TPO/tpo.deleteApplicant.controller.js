const Application = require("../../models/application.model");

const DeleteApplicant = async (req, res) => {
  try {
    const { appId } = req.params;

    await Application.findByIdAndUpdate(appId, {
  finalStatus: "deleted",
});


    res.json({ msg: "Applicant deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Delete error" });
  }
};

module.exports = DeleteApplicant;
