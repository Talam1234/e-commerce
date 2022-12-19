const express = require("express");
const {registeruser,
       loginuser, 
       logout, 
       forgotPassword, 
       resetPassword, 
       getUserDetail, 
       updatePassword, 
       updateProfile,
       getalluser,
       getsingleuser,
       deleteUser,
       updateRole} = require('../controller/usercontroller');
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/register").post(registeruser);
router.route("/login").post(loginuser);
router.route("/logout").get(logout);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(isAuthenticatedUser,getUserDetail);
router.route("/password/update").put(isAuthenticatedUser,updatePassword);
router.route("/me/update").put(isAuthenticatedUser,updateProfile);
router.route("/admin/user").get(isAuthenticatedUser,authorizeRoles("admin"),getalluser);
router.route("/admin/user/:id").get(isAuthenticatedUser,authorizeRoles("admin"),getsingleuser);
router.route("/admin/user/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateRole);
router.route("/admin/user/:id").delete(isAuthenticatedUser,authorizeRoles("admin"),deleteUser);

module.exports = router;