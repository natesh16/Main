const catchAsyncerror=require('../middleware/catchAsyncerror')
const Order=require("../model/ordermodels");
const product=require("../model/productmodles");
const ErrorHandler = require('../utils/errorehandeler');

//Create new order =/oder/createneworder 
exports.neworder=catchAsyncerror(async(req,res,next)=>{
    const {
        shippingInfo,
        ordeItems,
        itemsPrices,
        taxPrice,
        shippingprice,
        totalPrice,
        paymentInfo
    }=req.body;     
    const order=await Order.create({
        shippingInfo,
        ordeItems,
        itemsPrices,
        taxPrice,
        shippingprice,
        totalPrice,
        paymentInfo,
        paidAt:Date.now(),
        user:req.user.id
    })
    res.status(200).json({
        sucess:true,
        message:"Order Created",
        order
    })
})

//get Single Order 
exports.getSingleorder=catchAsyncerror(async(req,res,next)=>{
    const order=await Order.findById(req.params.id).populate('user','name email')
    if(!order){
        return next(new ErrorHandler(`Order not found for this id : ${req.params.id}`))
    }
    res.statuscode(200).json({
        sucess:true,
        message:"Order Deatils given below",
        order
    })
})

//get loggedin user order 
exports.myOrder=catchAsyncerror(async(req,res,next)=>{
    const order=await Order.find({user: req.user.id})
    if(!order){
        return next(new ErrorHandler(`Order not found for this id : ${req.params.id}`))
    }
    res.statuscode(200).json({
        sucess:true,
        message:"Order Deatils given below",
        order
    })
})

//Admin:Order controller
//Admin Get all the orders
exports.Adminorder=catchAsyncerror(async(req,res,next)=>{
    const order=await Order.find()
    let totalAmount=0
    order.foreach( order=>{
        totalAmount += order.totalPrice
    })
    if(!order){
        return next(new ErrorHandler(`Order not found for this id : ${req.params.id}`))
    }
    res.status(200).json({
        sucess:true,
        message:"Order Deatils given below",
        order
    })
})

//Admin:update order / order Status -api/v1/order:id
exports.updateOrder=catchAsyncerror(async(req,res,next)=>{
    const order=await Order.findById(req.params.id)
    if(order=="delivered"){
        return next(new (ErrorHandler("Order has been delivered",400)))
    }
    //updateing the product quantity
    order.orderItems=foreach( async orderItems=>{
        updateStock(orderItems.product,orderItems.Quantity)
    })
    order.Orderstatus = req.body.orderStatus()
    order.deliveredAt=Date.now();
    await order.save()

    res.status(200).json({
        sucess:true,
        message:"order updated",
        order
    })
})
async function updateStock(productId,Quantity){
    const product=await product.findById(productId)
    product.stock=product.stock - Quantity
    product.save({validateBeforSave:false})
}

//Admin:Order Delete router
exports.orderDelete=catchAsyncerror(async(req,res,next)=>{
    const order = await Order.findById(req.params.id)
    if(!order){
        return next(new ErrorHandler(`Order has not found on this id ${req.params.id}`,400))
    }
    await order.remove()
    res.status(200).json({
        sucess:true,
        message:"order has deleted"
    })
})