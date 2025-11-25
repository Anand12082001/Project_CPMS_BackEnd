const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const JobSchema = require('./job.model');

const companySchema = new Schema({
  companyName: { type: String, required: true },
  companyDescription: { type: String },
  companyWebsite: { type: String },
  companyLocation: { type: String, trim: true },
  companyDifficulty: { type: String, enum: ['Easy', 'Moderate', 'Hard'] }
});


// Pre middleware to delete jobs when the company is deleted
companySchema.pre('deleteOne', { document: true, query: false }, async function (next) {
  try {
    const companyId = this._id; // Get the current company's ID

    // Dynamically load the Job model to avoid circular dependency
    const Job = mongoose.model('Job');

    // Delete all jobs associated with this company
    await Job.deleteMany({ company: companyId });

    next(); // Proceed with the company deletion
  } catch (error) {
    next(error); // Pass any errors to the next middleware
  }
});


module.exports = mongoose.model('Company', companySchema);
// const mongoose = require('mongoose');

// const companySchema = new mongoose.Schema({
//   companyName: { type: String, required: true, unique: true },
//   companyDescription: String,
//   companyWebsite: String,
//   companyLocation: String,
//   companyDifficulty: String,
//   // NEW: login fields
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// }, { timestamps: true });

// module.exports = mongoose.model('Company', companySchema);
