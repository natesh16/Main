const { registerUser,
        LoginUser,
        logoutuser,
        ressetToken,
        getuserprofile,
        changepassword,
        updateProfile,
        getuserDatas,
        getuser,
        Userupdate,
        deleteuser,
        resetpassword
    } = require("../controller/authcontroller");
const express=require('express');
const {isAuthenticatedUser,authorizeRoles}=require('../middleware/authandicate')
const router =express()

//Routers
router.route('/register').post(registerUser)
router.route('/login').get(LoginUser)
router.route('/logout').get(logoutuser)
router.route('/ressetToken').post(ressetToken)
router.route('/resetpassword/:token').post(resetpassword)
router.route("/myprofile").get(isAuthenticatedUser,getuserprofile)
router.route("/chagepassword").put(isAuthenticatedUser,changepassword)
router.route("/updateUserdate").put(isAuthenticatedUser,updateProfile)

//Admin Route
router.route('/admin/userdata').get(isAuthenticatedUser,authorizeRoles('admin'),getuserDatas)
router.route('/admin/userdata/:id').get(isAuthenticatedUser,authorizeRoles('admin'),getuser)
router.route('/admin/userupdate/:id').put(isAuthenticatedUser,authorizeRoles('admin'),Userupdate)
router.route('/admin/userdata/:id').delete(isAuthenticatedUser,authorizeRoles('admin'),deleteuser)


module.exports=router;

