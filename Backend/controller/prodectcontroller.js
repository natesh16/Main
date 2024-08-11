const Product = require('../model/productmodles');
const ErrorHandler = require('../utils/errorehandeler');
const catchAsyncError = require('../middleware/catchAsyncerror');
const APIfeature =require('../utils/APIfeature');
//GET REQUEST FOR GETTING ALL THE PRODUCTS {{BASE_URL}}/api/v1/products 
exports.getProduct =catchAsyncError( async (req, res, next) => {
    const resPerPage =2
    const apifeature =new APIfeature(Product.find(),req.query).search().filter().paginate(resPerPage);
    const product = await apifeature.query;
    res.status(200).json({
        succes: true,
        count: product.length,
        product
    })
})
// POST REQUEST TO CERATE NEW PRODUCT  {{BASE_URL}}/api/v1/products/newproduct
exports.newproduct = catchAsyncError(async (req, res, next) => {
    req.body.user=req.user.id
    const product = await Product.create(req.body);
    res.status(201).json({
        succes: true,
        product
    })
})

//GET SINGLE PRODUCT 
exports.getSingleProduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler('Product has been not found', 404));
    }
    res.status(201).json({
        succes: true,
        product
    })
})

//UPDATE PRODUCT 
exports.updateproduct = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id)
    if (!product) {
        return res.status(404).json({
            succes: false,
            message: "Product not Found"
        })
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    res.status(200).json({
        succes: true,
        product
    })
})
//Product delect api:
exports.deleteproduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if(!product){
        return res.status(404).json({
            sucess:false,
            message:"product not fonund"
        })
    }
    await product.deleteOne();
    res.status(200).json({
        sucess:true,
        message:"product delected sucessfully"
    })
});