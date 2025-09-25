const express =require("express");
const { getProduct, newproduct, getSingleProduct,updateproduct,deleteproduct, CreateProductreview, getProductReviews, deleteReview } = require("../controller/prodectcontroller");
const router =express.Router();
const {isAuthenticatedUser,authorizeRoles}=require('../middleware/authandicate')
//Commen to both user and admin
router.route('/products').get(getProduct)
//Adime Route
router.route('/product/newproduct').post(isAuthenticatedUser,authorizeRoles('admin'),newproduct)
router.route('/product/:id')
                            .get(getSingleProduct)
                            .put(isAuthenticatedUser,authorizeRoles('admin'),updateproduct)
                            .delete(isAuthenticatedUser,authorizeRoles('admin'),deleteproduct)
//route for user review
router.route('/review').put(isAuthenticatedUser,CreateProductreview)
router.route('/getproductreview').get(isAuthenticatedUser,getProductReviews)
router.route('/deleteproductreview').delete(isAuthenticatedUser,deleteReview)
module.exports=router;
