const usermodel = require('../model/usermodel');
const ErrorHander = require('../utils/errorhander');
const catchasyncerror  = require('../middleware/catchasyncerror');
const ApiFeatures = require('../utils/apifeatures');
const sendtoken = require('../utils/jwttoken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

exports.registeruser = catchasyncerror(async (req,res,next)=>{
    const {name,email,password} = req.body;
    const user = await usermodel.create({name,email,password,
        profileimage:{public_id:"this is a sample image",url:"we will work on this during frontend"}})
    
    // const token = user.getJWTToken();
    // res.status(201).json({success:true,token});
    sendtoken(user,201,res);
})

exports.loginuser = catchasyncerror(async (req,res,next)=>{
    const {email,password} = req.body;

    if(!email || !password)
    {
        return next(new ErrorHander("please enter email and password",400))
    }
    const user = await usermodel.findOne({email:email}).select("+password");

    if(!user)
    {
        return next(new ErrorHander("invalid email and password",401))
    }

    const isPasswordMatch = user.comparePassword(password);
    if(!isPasswordMatch)
    {
        return next(new ErrorHander("invalid email and password",401))
    }

    // const token = user.getJWTToken();
    // res.status(201).json({success:true,token});
    sendtoken(user,201,res);
})

//logout

exports.logout = catchasyncerror(async (req,res,next)=>{
    res.cookie("token",null,{
        expire : Date.now(),
        httponly : true
    });
    res.status(200).json({success:true,message:"logout"})
})

//forgot password

exports.forgotPassword = catchasyncerror(async (req,res,next)=>{
    const user = await usermodel.findOne({email:req.body.email});
    if(!user)
    {
        return next(new ErrorHander("user not found",404))
    }
    const resetToken = user.getResetPasswordToken();
    await user.save({validateBeforeSave:false});
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
    const message = `your password reset token is:- \n\n${resetPasswordUrl}\n\nif you have not requested this email then, please ignore it`
    try {
        await sendEmail({
            email:user.email,
            subject:"ethical password reset",
            message
        })
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({validateBeforeSave:false});
        next(new ErrorHander(error.message,500));
    }
})

//reset password
exports.resetPassword = catchasyncerror(async (req,res,next)=>{
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = user.findOne({
        resetPasswordToken,
        resetPasswordExpire: {$gt: Date.now()}
    })

    if(!user)
    {
        return next(new ErrorHander("reset password token has been expired or invalid token",404))
    }

    if(req.body.password !== req.body.conformPassword)
    {
        return next(new ErrorHander("password doesnot match",404))
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    sendtoken(user, 200, res)
})

// get user details
exports.getUserDetail = catchasyncerror(async (req, res,next)=>{
    const user = await usermodel.findById(req.params.id);
    res.status(200).json({success:true,user});
})

//update user password

exports.updatePassword = catchasyncerror(async (req,res,next)=>{
    const user = await usermodel.findById(req.params.id).select("+password");
    if(!user)
    {
        return next(new ErrorHander("invalid email and password",401))
    }

    const isPasswordMatch = user.comparePassword(req.body.oldPassword);
    if(!isPasswordMatch)
    {
        return next(new ErrorHander("old password is incorrect",401))
    }

    if(req.body.newPassword !== req.body.conformPassword)
    {
        return next(new ErrorHander("password doesnot match",401))
    }

    user.password = req.body.newPassword;
    await user.save();
    // const token = user.getJWTToken();
    // res.status(201).json({success:true,token});
    sendtoken(user,200,res);
})

//update user profile

exports.updateProfile = catchasyncerror(async (req,res,next)=>{
    const newUserData = {
        name:req.body.name,
        email:req.body.email
    }
    const user = await usermodel.findByIdAndUpdate(req.params.id,newUserData,{new:true,runValidators:true,useFindAndModify:false});
    res.status(200).json({success:true,user});
    //sendtoken(user,200,res);
})

//get all user(admin)

exports.getalluser = catchasyncerror(async (req,res,next)=>{
    const user = await usermodel.find();
    res.status(200).json({success: true,user});
})

//get single user(admin)

exports.getsingleuser = catchasyncerror(async (req,res,next)=>{
    const user = await usermodel.findById(req.params.id);
    if(!user)
    {
        return next(new ErrorHander("user not found",401))
    }
    res.status(200).json({success: true,user});
})

//update user role

exports.updateRole = catchasyncerror(async (req,res,next)=>{
    const newUserData = {
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
    }
    const user = await usermodel.findByIdAndUpdate(req.params.id,newUserData,{new:true,runValidators:true,useFindAndModify:false});
    res.status(200).json({success:true,user});
    //sendtoken(user,200,res);
})

//delete user 

exports.deleteUser = catchasyncerror(async (req,res,next)=>{
    const user = await usermodel.findById(req.params.id);
    if(!user)
    {
        return next(new ErrorHander("user not found",401))
    }
    await user.remove();
    //const user = await usermodel.findByIdAndUpdate(req.params.id,newUserData,{new:true,runValidators:true,useFindAndModify:false});
    res.status(200).json({success:true,message:"user deleted successfully"});
    //sendtoken(user,200,res);
})