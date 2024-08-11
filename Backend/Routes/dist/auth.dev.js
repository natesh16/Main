"use strict";

var _require = require("../controller/authcontroller"),
    registerUser = _require.registerUser,
    LoginUser = _require.LoginUser,
    logoutuser = _require.logoutuser,
    ressetToken = _require.ressetToken,
    getuserprofile = _require.getuserprofile,
    changepassword = _require.changepassword,
    updateProfile = _require.updateProfile,
    getuserDatas = _require.getuserDatas,
    getuser = _require.getuser,
    Userupdate = _require.Userupdate,
    deleteuser = _require.deleteuser;

var express = require('express');

var _require2 = require('../middleware/authandicate'),
    isAuthenticatedUser = _require2.isAuthenticatedUser,
    authorizeRoles = _require2.authorizeRoles;

var router = express(); //Routers

router.route('/register').post(registerUser);
router.route('/login').get(LoginUser);
router.route('/logout').get(logoutuser);
router.route('/ressetToken').post(ressetToken);
router.route("/myprofile").get(isAuthenticatedUser, getuserprofile);
router.route("/chagepassword").put(isAuthenticatedUser, changepassword);
router.route("/updateUserdate").put(isAuthenticatedUser, updateProfile); //Admin Route

router.route('/admin/userdata').get(isAuthenticatedUser, authorizeRoles('admin'), getuserDatas);
router.route('/admin/userdata/:id').get(isAuthenticatedUser, authorizeRoles('admin'), getuser);
router.route('/admin/userupdate/:id').put(isAuthenticatedUser, authorizeRoles('admin'), Userupdate);
router.route('/admin/userdata/:id')["delete"](isAuthenticatedUser, authorizeRoles('admin'), deleteuser);
module.exports = router;