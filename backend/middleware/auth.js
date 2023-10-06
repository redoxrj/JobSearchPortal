const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require('../models/userModel.js')



exports.isAuthenticatedUser = catchAsyncErrors(async (req,res,next)=>{
    const {token} = req.cookies
    // console.log(token)
    if(!token){
        return next(new ErrorHandler('please login to access this resource',401));
    }
    const decodedData = jwt.verify(token,process.env.JWT_SECRET) // here will will get that id object that we used to sign the message to generate jwt token

    req.user = await User.findById(decodedData.id)
    next()  

})
 
