const { JsonWebTokenError, TokenExpiredError } = require("jsonwebtoken");
const ErrorHander = require("../utils/errorhander");

module.exports = (err,req,res,next)=>{
    err.statuscode = err.statuscode || 500;
    err.message = err.message || "Internet Server Error";

    //wrong mongodb id error

    if(err.name === "castError")
    {
        const message = `Resource not found.Invalid: ${err.path}`;
        err = new ErrorHander(message,400);
    }

    //mongoose dublicate key error

    if(err.code === 11000)
    {
        const message = `Dublicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHander(message,400);
    }

    // wrong JWT error

    if(err.name === JsonWebTokenError)
    {
        const message = `json web token is invalid, try again`;
         err = new ErrorHander(message,400);
    }

    //jwt expire error

    if(err.name === TokenExpiredError)
    {
        const message = `json web token is expired, try again`;
         err = new ErrorHander(message,400);
    }
    res.status(err.statuscode).json({success : false,message : err.message})
}

