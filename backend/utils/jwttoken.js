const sendtoken = (user,statuscode,res)=>{
    const token = user.getJWTToken();

    const options = {
        expire : Date.now() + process.env.COOKIE_EXPIRE * 24*60*60*1000,
        // expire : new Date{
        //     Date.now() + process.env.COOKIE_EXPIRE * 24*60*60*1000
        // },
        httponly : true
    };

    res.status(statuscode).cookie("token",token,options).json({success:true,user,token})
}

module.exports = sendtoken