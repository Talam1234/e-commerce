const ErrorHander = require("../utils/errorhander");
const catchasyncerror = require("./catchasyncerror");
const jwt = require("jsonwebtoken");
const user = require("../model/usermodel")

exports.isAuthenticatedUser = catchasyncerror(async (req,res,next)=>{
    const {token} = req.cookies;
    console.log(token)
    if(token == null)
    {
        return next(new ErrorHander("please login to access the resources",401))
    }

    const decodedData = jwt.verify(token,process.env.JWT_SECRET);
    req.user = await user.findById(decodedData.id);
    next();
})

exports.authorizeRoles = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role))
        {
            return next(new ErrorHander(`${req.user.role} is not allowed to access this resources`,403))
        }
        next();
    }
}