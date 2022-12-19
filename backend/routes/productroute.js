const express = require("express");
const { getallproduct,
        createproduct,
        updateproduct,
        deleteproduct,
        getoneproduct,
        createProductReview, 
        getProductReview,
        deleteReview} = require("../controller/productcontroller");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/product").get(getallproduct);
router.route("/admin/product/new").post(isAuthenticatedUser,authorizeRoles("admin"),createproduct);
router.route("/admin/product/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateproduct);
router.route("/admin/product/:id").delete(isAuthenticatedUser,authorizeRoles("admin"),deleteproduct)
router.route("/product/:id").get(getoneproduct);
router.route("/review").put(isAuthenticatedUser,createProductReview);
router.route("/reviews").get(getProductReview).delete(isAuthenticatedUser,deleteReview);

module.exports = router;