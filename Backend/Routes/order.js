const express=require( "express")
const {isAuthenticatedUser}=require('../middleware/authandicate');
const { neworder, getSingleorder, myOrder, updateOrder, orderDelete }=require("../controller/ordercontroller");
const router=express.Router()

//order route
router.route('/order/new').post(isAuthenticatedUser,neworder)
router.route('/order/:id').get(isAuthenticatedUser,getSingleorder)
router.route('/order/myorders/:id').egt(isAuthenticatedUser,myOrder)

//admin route
router.route('/admin/order').get(isAuthenticatedUser,authorizeRoles('admin'),Adminorder)
router.route('/admin/updateorder/:id').put(isAuthenticatedUser,authorizeRoles('admin'),updateOrder)
router.route('/admin/deleteorder/:id').delete(isAuthenticatedUser,authorizeRoles('admin'),orderDelete)

module.exports=router