const express =require("express");
const { getProduct, newproduct, getSingleProduct,updateproduct,deleteproduct, CreateProductreview, getproductreviews, deletereview } = require("../controller/prodectcontroller");
const router =express.Router();
const {isAuthenticatedUser,authorizeRoles}=require('../middleware/authandicate')
router.route('/products/newproduct').post(isAuthenticatedUser,authorizeRoles('admin'),newproduct)
router.route('/product/:id')
                            .get(getSingleProduct)
                            .put(updateproduct)
                            .delete(deleteproduct)
//Adime Route
router.route('/products').get(getProduct)

//route for user review
router.route('/review').put(isAuthenticatedUser,CreateProductreview)
router.route('/getproductreview').get(isAuthenticatedUser,getproductreviews)
router.route('/deleteproductreview').delete(isAuthenticatedUser,deletereview)
module.exports=router;
