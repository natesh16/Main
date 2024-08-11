const express=require("express");
const cookiePraser =require('cookie-parser')
const midelware=require("./middleware/error")

//Router 
const products = require("./Routes/product");
const auth=require('./Routes/auth')
const order=require('./Routes/order')

const app=express();

app.use(express.json())
app.use(cookiePraser())
app.use('/nscart',products)
app.use('/nscart/auth',auth);
app.use('/nscart/auth/order',order)
app.use(midelware);

module.exports=app;