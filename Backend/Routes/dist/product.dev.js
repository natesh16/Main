"use strict";

var express = require("express");

var _require = require("../controller/prodectcontroller"),
    getProduct = _require.getProduct,
    newproduct = _require.newproduct,
    getSingleProduct = _require.getSingleProduct,
    updateproduct = _require.updateproduct,
    deleteproduct = _require.deleteproduct,
    CreateProductreview = _require.CreateProductreview,
    getproductreviews = _require.getproductreviews,
    deletereview = _require.deletereview;

var router = express.Router();

var _require2 = require('../middleware/authandicate'),
    isAuthenticatedUser = _require2.isAuthenticatedUser,
    authorizeRoles = _require2.authorizeRoles;

router.route('/products/newproduct').post(isAuthenticatedUser, authorizeRoles('admin'), newproduct);
router.route('/products/:id').get(getSingleProduct).put(updateproduct)["delete"](deleteproduct); //Adime Route

router.route('/products').get(isAuthenticatedUser, getProduct); //route for user review

router.route('/review').put(isAuthenticatedUser, CreateProductreview);
router.route('/getproductreview').get(isAuthenticatedUser, getproductreviews);
router.route('/deleteproductreview')["delete"](isAuthenticatedUser, deletereview);
module.exports = router;