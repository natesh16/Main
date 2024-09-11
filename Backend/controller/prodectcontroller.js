const Product = require('../model/productmodles');
const ErrorHandler = require('../utils/errorehandeler');
const catchAsyncError = require('../middleware/catchAsyncerror');
const APIfeature =require('../utils/APIfeature');

//search opertion
//GET REQUEST FOR GETTING ALL THE PRODUCTS {{BASE_URL}}/api/v1/products 
exports.getProduct =catchAsyncError( async (req, res, next) => {
    const resPerPage =4
    const apifeature =new APIfeature(Product.find(),req.query).search().filter().paginate(resPerPage);
    const totelItemCount=await Product.countDocuments({})
    const products = await apifeature.query;
    res.status(200).json({
        succes: true,
        count:totelItemCount,
        resPerPage,
        products
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

//Product Reviews
exports.CreateProductreview=catchAsyncError(async(req,res,next)=>{
    const {
            productId,
            rating,
            comment
    } =req.body

    const review= {
        user:req.params.id,
        rating,
        comment
    }
    const product =await Product.findById(productId)
    const isreview=product.reviews.find(review =>{
        review.user.toString() == req.user.id.toString()
    })
    //finding the user and revies details 
    if(isreview){
        //updateing the review details
        product.reviews.forEach(review=>{
            if(review.user.id.toString() == req.user.id.toString()){
                review.comment=comment,
                review.rating=rating
            }
        })
    }else{
        //creating the review details
        product.reviews.push(review)
        product.numOfReviews=product.reviews.length()
    }
    //find the average of product 
        product.ratings = product.reviews.reduce((acc,review)=>{
            return review.rating + acc
        },0)/ product.reviews.length ;
        product.ratings=isNaN(product.rating)? 0 :product.ratings
        await product.save({ValidateBeforeSave :false})

        res.status(200).json({
            sucess:true,
            message:"review Added or may updated"
        })
    })

//get Reviews -api/v1/reviews ?id={productId}
exports.getproductreviews=catchAsyncError(async(req,res,next)=>{
    const product= await Product.findById(req,query,id)

    res.status(200).json({
        sucess:true,
        message:"product review",
        product
    })
})

//delete review
exports.deletereview=catchAsyncError(async(req,res,next)=>{
    const product=catchAsyncError(async(req,res,next)=>{
        //filiter the reviews which does match the deleting review id
        const review= product.reviews.filer(review=>{
            return review._id.toString() !== req.query.id.toString()
        });
        //number of reviews 
        const numOfReviews =review.length
        //finding the average of review
        let ratings=review.reduce((acc,review)=>{
           return review.rating + acc
        },0)/ review.length ;
    ratings=isNaN(ratings)?0:ratings
    await product.findByIdAndUpdate(req.query.productId,{
        review,
        numOfReviews,
        ratings
    }) 
    res.status(200).json({
        success:true,
        message:"success",
        review
    })
    })

})