const express = require('express');
const { getAllJobs,createJob, updateJob, deleteJob, getJobDetails, createJobReview, getJobReviews, deleteReview, getAdminJobs } = require('../controllers/jobController');
const { isAuthenticatedUser } = require('../middleware/auth');

const router = express.Router()

router.route('/jobs').get( getAllJobs)

router.route('/admin/job/new').post(isAuthenticatedUser, createJob)


router.route('/job/:id').get(getJobDetails)



module.exports =router