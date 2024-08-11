"use strict";

var express = require("express");

var _require = require('../middleware/authandicate'),
    isAuthenticatedUser = _require.isAuthenticatedUser;

var _require2 = require("../controller/ordercontroller"),
    neworder = _require2.neworder,
    getSingleorder = _require2.getSingleorder,
    myOrder = _require2.myOrder,
    updateOrder = _require2.updateOrder,
    orderDelete = _require2.orderDelete;

var router = express.Router(); //order route

router.route('/order/new').post(isAuthenticatedUser, neworder);
router.route('/order/:id').get(isAuthenticatedUser, getSingleorder);
router.route('/order/myorders/:id').egt(isAuthenticatedUser, myOrder); //admin route

router.route('/admin/order').get(isAuthenticatedUser, authorizeRoles('admin'), Adminorder);
router.route('/admin/updateorder/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateOrder);
router.route('/admin/deleteorder/:id')["delete"](isAuthenticatedUser, authorizeRoles('admin'), orderDelete);
module.exports = router;