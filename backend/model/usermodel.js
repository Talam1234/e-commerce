const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto')

const userschema = new mongoose.Schema({
    name : {
        type : String,
        required : [true,"please enter product name"]
    },
    email : {
        type : String,
        unique: true,
        maxLenght : [30,"length cannot exceed 30 character"],
        minLength : [4,"length cannot less than 4 character"],
        validate : [validator.isEmail,"please enter valid email"]
    },
    password : {
        type : String,
        required : [true,"please enter password"],
        minLength : [8,"length cannot less than 8 character"],
        select : false
    },
    profileimage : {
        public_id : {
            type : String,
            required : true
        },
        url : {
            type : String,
            required : true
        }
    },
    role : {
        type : String,
        default : "user"
    },

    resetPasswordToken : String,
    resetPasswordExpire : Date,
})
//converting password into hash
userschema.pre("save", async function(next){
    if(!this.isModified("password"))
    {
        next();
    }
    this.password = await bcrypt.hash(this.password,10);
})
//jwt
userschema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXPIRE})
}
//compare password
userschema.methods.comparePassword = async function(enterPassword){
    return await bcrypt.compare(enterPassword,this.password)
}

//generating reset password
userschema.methods.getResetPasswordToken = function(){
    //generating tokeen
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")
    this.resetPasswordExpire = Date.now() + 15*60*1000;
    return resetToken;
}

const usermodel = mongoose.model('user',userschema);

module.exports = usermodel