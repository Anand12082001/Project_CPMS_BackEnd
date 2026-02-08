const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    // TPO controlled fields
    currentRound: String,
    roundStatus: String,
    finalStatus: String,

    interviewMode: String,
    interviewTime: Date,
    interviewLink: String,
    interviewAddress: String,
  },
  {
    timestamps: true, // 🔥 THIS FIXES appliedAt
  }
);

module.exports = mongoose.model("Application", ApplicationSchema);
