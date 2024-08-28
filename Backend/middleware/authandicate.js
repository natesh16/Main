const ErrorHandler =require('../utils/errorehandeler')
const nst =require('jsonwebtoken')
const user=require('../model/userModel')
const catchAsyncerror = require("./catchAsyncerror");

exports.isAuthenticatedUser= catchAsyncerror(async(req,res,next)=>{
    const {token} = req.cookies
    if(!token){
        return next(new ErrorHandler('login frist to handel this resource',401))
    }
    const decoded=nst.verify(token,process.env.NST_SECRET)
    req.user=await user.findById(decoded.id)
    next();
}) 

exports.authorizeRoles=(...role)=>{
    return (req,res,next)=>{
        if(!role.includes(req.user.role)){
            next(new ErrorHandler(`Role $(req.user.rolr) is not allowed`,401))
         return 
        }
    next()
    }
}