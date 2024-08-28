const mongoose =require('mongoose');
const validator=require('validator')
const bcrypt=require('bcrypt') 
const nst=require('jsonwebtoken')
const crypto=require('crypto')

const userSchema =new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter the Name"]
    },
    email:{
        type:String,
        required:[true,"Please Enter the email"],
        unique:true,
        Validate:[validator.isEmail,'please enter the valid email address']
    },
    password:{
        type:String,
        required:true,
        maxlength:[16,"password length exceed 6 characters"],
        select:false
    },
    avatar:{
        type:String,
    },
    role:{
        type:String,
        required:true,
    },
    resetpasswordToken:String,
    resetpasswordExpires:String,
    createdAt:{
        type:Date,
        default:Date.now
    }
})
userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next()
    }
    this.password = await bcrypt.hash(this.password,15)
})
userSchema.methods.getnsttoken=function(){
    return nst.sign({id:this.id},process.env.NST_SECRET,{
        expiresIn:process.env.NST_EXPIRES_TIMER
    })
}
userSchema.methods.isValidpassword=async function(enteredpassword){
    return await bcrypt.compare(enteredpassword,this.password);
}

userSchema.methods.Confirmpassword=async function(newpassword,confirmpassword){
    if(newpassword===confirmpassword){
        const newpassword=this.password
        this.password= await bcrypt.hash(this.password,15)
    }
    const message="Entered password are not matching"
    return message;
}

let models= mongoose.model('useer',userSchema);
module.exports=models;
