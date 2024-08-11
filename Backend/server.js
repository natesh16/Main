const app=require('./app');
const dotenv=require('dotenv');
const path=require("path");
const connectDatabase = require('./config/database');

dotenv.config({path:path.join(__dirname,"config/config.env")})
connectDatabase();

process.on('unhandledRejection',(err)=>{
    console.log(`erroor:${err}`);
    console.log("Server gets shuding down due to unhandlerejection errror");
    server.close(()=>{
        process.exit(1);
    })
})
process.on('uncaughtException',(err)=>{
    console.log(`Error:${err.message}`)
    console.log("Sever gets shuding down");
    server.close(()=>{
        procress.exti(1);
    })
});

const server = app.listen(process.env.PORT,()=>{
    console.log(`sever lisiting to the port ${process.env.PORT} in ${process.env.NODE_ENV}` );
})