const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth.middleware');

const Login = require('../controllers/TPO/tpo.login.controller');
const PostJob = require('../controllers/TPO/tpo.post-job.controller');

const {
  AllJobs,
  DeleteJob,
  JobData,
  JobWithApplicants,
  StudentJobsApplied
} = require('../controllers/user/user.all-jobs.controller');

const UpdateInterview = require('../controllers/TPO/tpo.interview.controller');

// login
router.post('/login', Login);

// post job
router.post('/post-job', authenticateToken, PostJob);

// all jobs
router.get('/jobs', authenticateToken, AllJobs);

// delete job
router.post('/delete-job', authenticateToken, DeleteJob);

// view a job
router.get('/job/:jobId', authenticateToken, JobData);

// job with applicants
router.get('/job/applicants/:jobId', authenticateToken, JobWithApplicants);

// student jobs applied
router.get('/myjob/:studentId', authenticateToken, StudentJobsApplied);

// ✅ ONLY ONE interview route
router.post(
  '/interview/:jobId/:appId',
  authenticateToken,
  UpdateInterview
);
const { GetApplicationTracker } = require('../controllers/user/user.all-jobs.controller');

router.get(
  '/application-tracker/:jobId/:studentId',
  authenticateToken,
  GetApplicationTracker
);
router.delete(
  "/interview/:jobId/:appId",
  authenticateToken,
  require("../controllers/TPO/tpo.deleteApplicant.controller")
);


module.exports = router;
