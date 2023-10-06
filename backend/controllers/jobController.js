const Job = require('../models/jobModel')
const ErrorHandler = require ('../utils/errorhandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ApiFeatures = require('../utils/apifeatures.js');

// create a new Job -- only admin access
exports.createJob = catchAsyncErrors(async(req,res,next)=>{


    const job = await Job.create(req.body)
    res.status(201).json({success:true,job}) 
 

})

// get/fetch all jobs 
exports.getAllJobs =catchAsyncErrors(async (req, res,next)=>{
    const resultsPerPage = 8
    const jobsCount = await Job.countDocuments()
    // note : Job.find() or Job.find().find() will work same as we set it using ApiFeatures constructor
    const apiFeature=new ApiFeatures(Job.find(),req.query).search().pagination(resultsPerPage)
    // apiFeature.search()   // same as above .search()
    const jobs = await apiFeature.query
    res.status(200).json({success:true,jobsCount,resultsPerPage,jobs});
    
})



// get/fetch a single job  details
exports.getJobDetails =catchAsyncErrors(async (req, res,next)=>{
    let job = await Job.findById(req.params.id)
    if(!job){
        return next(new ErrorHandler("Job not found",404))  // next is call by function basically
    }
    res.status(201).json({success:true,job})
    
})



