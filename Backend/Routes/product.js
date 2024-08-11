const express =require("express");
const { getProduct, newproduct, getSingleProduct,updateproduct,deleteproduct } = require("../controller/prodectcontroller");
const router =express.Router();
const {isAuthenticatedUser,authorizeRoles}=require('../middleware/authandicate')
router.route('/products/newproduct').post(isAuthenticatedUser,authorizeRoles('admin'),newproduct)
router.route('/products/:id')
                            .get(getSingleProduct)
                            .put(updateproduct)
                            .delete(deleteproduct)
//Adime Route
router.route('/products').get(isAuthenticatedUser,getProduct)
module.exports=router;
