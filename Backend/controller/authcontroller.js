const User=require("../model/userModel")
const catchAsyncerror=require( "../middleware/catchAsyncerror")
const ErrorHandler = require("../utils/errorehandeler")
const sendtoken=require('../utils/nst')

//Registed user
exports.registerUser= catchAsyncerror(async(req,res,next)=>{
    const {name,email,password,role}=req.body
    const user=await User.create({
        name,email,password,role
    })
    sendtoken(user,200,res)
})

//login user
exports.LoginUser=catchAsyncerror(async(req,res,next)=>{
    const {email,password}=req.body
    if( !email || !password){
        return next(new ErrorHandler("Please Enter the Valid Email or Password"))
    }
    const user = await User.findOne({email}).select("+password");
    if(await !user.isValidpassword(password)){
        return next(new ErrorHandler("Invalid Email OR Password",400))
    }
    sendtoken(user,200,res)
})

//logout user
exports.logoutuser=(req,res,next)=>{
    res.cookie('token',null,{expires:new Date(Date.now()),
       httponly:true})
       .status(200).json({
       sucess:true,
       message:"Loggedout"
    })
}

//resetpassword request
exports.ressetToken=catchAsyncerror(async(req,res,next)=>{
    const {email}=req.body;
    const user=await User.findOne({email})
    if(!user){
        return res.status(404).json({
            message:"User is invalid or Not Found"
        })
    }
    const token=Math.random().toString(36).slice(-8)
    user.resetpasswordToken=token
    user.resetpasswordTokenExpie=Date()*3600000
    await user.save()
    console.log(token)
    const transporters=nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"natesh0917@gmail.com",
            pass:"cips xmsa jikk ejin"
        }
    })
    
    const message={
        from:"natesh0917@gmail.com",
        to:user.email,
        subject:"password resset requested",
        text:`From your request we are providing a password reset token here.."${token}"\n\n if your not requested just ignore it `
    }
    transporters.sendMail(message,(err,info)=>{
        if(err){
            res.status(404).json({
                message:"somethink went wrong! try again"
            })
        }
        res.status(200).json({
            message:`mail has been send to the email` +info.response
        })
    })
})

exports.resetpassword=catchAsyncerror(async(req,res,next)=>{
    const {token}=req.params
    const {Newpassword}=req.body
    const {Confirmpassword}=req.body
    const user=await User.findOne({
        resetpasswordToken:token,
        resetpasswordExpires:{ $gt : Date.now()}
    })
    const password= user.Confirmpassword(Newpassword,Confirmpassword)
    res.status(200).json({
        message:`new password updated to ${password}`,
    })
    
    // const user=await User.findOne({
    //     resetpasswordToken:token,
    //     resetpasswordExpires:{ $gt : Date.now()}
    // })
    // if(!user){
    //     return res.status(400).json({message:"Invalid user data"})
    // }
    // const hashpassword= await bcrypt.hash(password,10)
    // user.password=hashpassword
    // user.resetpasswordExpires=null,
    // user.resetpasswordToken=null,
})

//get user profile
exports.getuserprofile=catchAsyncerror(async(req,res,next)=>{
    const user= await User.findById(req.user.id)
    res.status(200).json({
        sucess:true,
        message:"User data obtained",
        user
    })
})

//change password
exports.changepassword=catchAsyncerror(async(req,res,next)=>{
    const { currentpassword , Newpassword }=req.body
    const user =await User.findById(req.user.id).select("+password")
    
    //check old password
    if(!await user.isValidpassword(req.body.currentpassword)){
        return next(ErrorHandler("Password is incorrect",401))
    }

    //assigning new password
    user.password= req.body.Newpassword;
    await user.save();
    res.status(200).json({
        sucess:true,
        message:"password update"
    })
})

//update Profile
exports.updateProfile =catchAsyncerror(async(req,res,next)=>{
    const newUserUpdate={
        name:req.body.name,
        email:req.body.email
    }
    const user=await User.findByIdAndUpdate(req.user.id,newUserUpdate,{
        new:true,
        runValidators:true
    })
    res.status(200).json({
        success:true,
        user
    })

})

//admin route
//Admin:get all the user data 
exports.getuserDatas=catchAsyncerror(async(req,res,next)=>{
    const user=await User.find()
    if(!user){
        return next(new ErrorHandler("No longer user fonund",400))
    }
    res.status(200).json({
        sucess:true,
        message:"All the user date are listed here",
        count:user.length,
        user
    })
})

//Admin:get speciified user data
exports.getuser=catchAsyncerror(async(req,res,next)=>{
    const user =await User.findById(req,params.id);
    if(!user){
        return next(new ErrorHandler("user not fonund",400))
    }
    res.status(200).json({
        sucess:true,
        message:"user data",
        user
    })
})

//Admin:User data updata 
exports.Userupdate=catchAsyncerror(async(req,res,next)=>{
    const newUserUpdate={
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
    }
    const user=await User.findByIdAndUpdate(req.user.id,newUserUpdate,{
        new:true,
        runValidators:true
    })
    res.status(200).json({
        success:true,
        user
    })

})

//Admin:Delete user data
exports.deleteuser=catchAsyncerror(async(req,res,next)=>{
    const user =await User.findById(req,params.id);
    if(!user){
        return next(new ErrorHandler("user not fonund",400))
    }
    await user.remove()
    
})