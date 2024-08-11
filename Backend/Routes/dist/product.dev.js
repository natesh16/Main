"use strict";

var express = require("express");

var _require = require("../controller/prodectcontroller"),
    getProduct = _require.getProduct,
    newproduct = _require.newproduct,
    getSingleProduct = _require.getSingleProduct,
    updateproduct = _require.updateproduct,
    deleteproduct = _require.deleteproduct;

var router = express.Router();

var _require2 = require('../middleware/authandicate'),
    isAuthenticatedUser = _require2.isAuthenticatedUser,
    authorizeRoles = _require2.authorizeRoles;

router.route('/products/newproduct').post(isAuthenticatedUser, authorizeRoles('admin'), newproduct);
router.route('/products/:id').get(getSingleProduct).put(updateproduct)["delete"](deleteproduct); //Adime Route

router.route('/products').get(isAuthenticatedUser, getProduct);
module.exports = router;