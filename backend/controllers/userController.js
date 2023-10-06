const User = require('../models/userModel')
const ErrorHandler = require ('../utils/errorhandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const sendToken = require('../utils/jwtTokenSend');

// register/create a user
exports.registerUser = catchAsyncErrors(async(req,res)=>{
   

    const {name,email,password} = req.body
    const user = await User.create({name,email,password})

    sendToken(user,201,res)


})

// login a user
exports.loginUser = catchAsyncErrors(async(req,res,next)=>{
    const {email,password} = req.body

    if(!email || !password){  // agar email and password ni mila to(koi bhi empty hai toh)
        return next(new ErrorHandler("please enter email and password",401)) 
    }
    const user = await User.findOne({email}).select('+password')
    // we ccanot find password direcltly as we have mentioned in userSchema password as select : false
    if(!user){
        return next(new ErrorHandler("user doesnot exist",401)) 

    }
    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){

        return next(new ErrorHandler("invalid email or password",401)) 

    }
    // console.log(isPasswordMatched)
    sendToken(user,201,res)

    

})

// logout a user 
exports.logoutUser = catchAsyncErrors(async(req, res, next)=>{
       res.cookie('token',null,{
        httpOnly:true,
        expires : new Date(Date.now())  
       })
   
    res.status(200).json({success:true,message:'Logged out successfully'})
})




//get User Details -own 
exports.getUserDetails =catchAsyncErrors(async (req, res,next)=>{
    const user = await User.findById(req.user.id)  
    res.status(201).json({success:true,user})
    
})

//update User password
exports.updatePassword =catchAsyncErrors(async (req, res,next)=>{
    const user = await User.findById(req.user.id).select('+password')
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched){

        return next(new ErrorHandler("Old password is incorrect",401)) 

    }
    if(req.body.newPassword!==req.body.confirmPassword){

        return next(new ErrorHandler("confirm password doesnot match",401)) 

    }
    user.password = req.body.newPassword
    await user.save()
    sendToken(user,200,res)
    
})

//update User profile
exports.updateProfile =catchAsyncErrors(async (req, res,next)=>{
    const newUserData = {
        name : req.body.name,
        email: req.body.email

    }
    const user = await User.findByIdAndUpdate(req.user.id, newUserData,{
        new: true,
        runValidators: true,
        useFindAndModify: true
    })
    res.status(201).json({success: true, message:'profile updated successfully'})
    
})

