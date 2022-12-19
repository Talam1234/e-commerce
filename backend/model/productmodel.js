const mongoose = require('mongoose')

const productschema = new mongoose.Schema({
    name : {
        type : String,
        required : [true,"please enter product name"]
    },
    discription : {
        type : String,
        required : [true,"please enter discription"]
    },
    prices : {
       type : Number,
       required : [true,"please enter product prices"],
       maxLenght : [8,"length cannot exceed 8 character"]
   },
    ratings : {
        type : Number,
        default:0
    },
    image : [
        {
            public_id : {
                type : String,
                required : true
            },
            url : {
                type : String,
                required : true
            }
        }
    ],
    category : {
        type : String,
        required : [true,"please enter product category"]
    },
    stock : {
        type : Number,
        required : [true,"please enter stock"],
        maxLength : [4,"stock connot exceed 4 charcter"],
        default : 1
    },
    noOfreviews : {
        type : Number,
        default : 0
    },
    reviews : [
        {
            user : {
                type : mongoose.Schema.ObjectId,
                ref:"User",
                required:true
            },
            name : {
                type : String,
                required : true,
            },
            rating : {
                type : Number,
                required : true,
            },
            comment : {
                type : String,
                required : true
            }
        }
    ],
    user : {
        type : mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
})

// 2:50 please check again the changes
const productmodel = mongoose.model('productinfo',productschema);

module.exports = productmodel