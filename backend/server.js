const app = require("./app");
const dotenv = require("dotenv");
const connectDB = require("./config/db")

//uncaught error
process.on("uncaughtException",(err)=>{
    console.log(`Error : ${err.message}`);
    console.log(`shutting the server due to uncaught Exception`);
    process.exit(1);
})


dotenv.config({path:"backend/config/config.env"})

connectDB();
const server = app.listen(process.env.PORT,()=>{
    console.log(`server is running at port ${process.env.PORT}`)
})

process.on("unhandledRejection",(err)=>{
    console.log(`Error : ${err.message}`);
    console.log(`shutting the server due to unhandled promise rejection`);

    server.close(()=>{
        process.exit(1);
    })
})