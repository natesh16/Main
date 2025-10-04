const catchAsyncerror=require('../middleware/catchAsyncerror')
const Order=require("../model/ordermodels");
const product=require("../model/productmodles");
const ErrorHandler = require('../utils/errorehandeler');

//Create new order =/oder/createneworder 
exports.neworder = catchAsyncerror(async (req, res, next) => {
    const {
        shippingInfo,
        orderItems,   // ✅ fixed
        itemsPrices,
        taxPrice,
        shippingprice,
        totalPrice,
        paymentInfo
    } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,   // ✅ correct field name
        itemsPrices,
        taxPrice,
        shippingprice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user.id
    });

    res.status(200).json({
        success: true,
        message: "Order Created",
        order
    });
});

//get Single Order 
exports.getSingleorder=catchAsyncerror(async(req,res,next)=>{
    const order=await Order.findById(req.params.id).populate('user','name email')
    if(!order){
        return next(new ErrorHandler(`Order not found for this id : ${req.params.id}`))
    }
    res.status(200).json({
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
    res.status(200).json({
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
    order.forEach(order=>{
        totalAmount += order.totalPrice})
    if(!order){
        return next(new ErrorHandler(`Order not found for this id : ${req.params.id}`,400))
    }
    res.status(200).json({
        sucess:true,
        message:"Order Deatils given below",
        order
    })
})

//Admin:update order / order Status -api/v1/order:id
// The helper function to update stock (CORRECTED)
async function updateStock(productId, quantity) {
    // 1. Use the correct Model name (e.g., 'Product')
    const product = await product.findById(productId);

    if (product) {
        product.stock = product.stock - quantity;
        // 2. Await the save operation!
        await product.save({ validateBeforeSave: false });
    }
}
exports.updateOrder =  catchAsyncerror(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if(order.orderStatus == 'Delivered') {
        return next(new ErrorHandler('Order has been already delivered!', 400))
    }
    //Updating the product stock of each order item
    order.orderItems.forEach(async orderItem => {
        await updateStock(orderItem.product, orderItem.quantity)
    })

    order.orderStatus = req.body.orderStatus;
    order.deliveredAt = Date.now();
    await order.save();

    res.status(200).json({
        success: true
    })
    
});
//Admin:Order Delete router
exports.orderDelete=catchAsyncerror(async(req,res,next)=>{
    const order = await Order.findById(req.params.id)
    if(!order){
        return next(new ErrorHandler(`Order has not found on this id ${req.params.id}`,400))
    }
    await order.remove;
    res.status(200).json({
        sucess:true,
        message:"order has deleted"
    })
})