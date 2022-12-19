const mongoose = require('mongoose')

const connectDB = ()=>{
    //,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true}
    mongoose.connect(process.env.DB)
        .then((data)=>{
            console.log(`Mongodb connected with server: ${data.connection.host}`)
        })
        // .catch((err)=>{
        //     console.log(err);
        // })
}
module.exports = connectDB
