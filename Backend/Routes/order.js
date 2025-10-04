const express=require( "express")
const {isAuthenticatedUser,authorizeRoles}=require('../middleware/authandicate');
const { neworder, getSingleorder, myOrder, updateOrder, orderDelete,Adminorder }=require("../controller/ordercontroller");
const router=express.Router()

//order route
router.route('/new').post(isAuthenticatedUser,neworder)
router.route('/:id').get(isAuthenticatedUser,getSingleorder)
router.route('/myorders/:id').get(isAuthenticatedUser,myOrder)

//admin route
router.route('/admin/order').get(isAuthenticatedUser,authorizeRoles('admin'),Adminorder)
router.route('/admin/updateorder/:id').patch(isAuthenticatedUser,authorizeRoles('admin'),updateOrder)
router.route('/admin/deleteorder/:id').delete(isAuthenticatedUser,authorizeRoles('admin'),orderDelete)

module.exports=router
