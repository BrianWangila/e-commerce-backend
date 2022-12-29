const express = require("express");
const {getAllProduct , createProduct, updateProduct, deleteProduct, getProduct, createReview, getAllReviews} = require("../controller/productController");
const {checkLogin, roleCheck}  = require("../middleware/auth");

const router = express.Router();

router.route('/products').get(getAllProduct);
router.route('/product/new').post(checkLogin,roleCheck,createProduct);
router.route('/createReview').put(checkLogin,createReview);
router.route('/product/:id').put(checkLogin,roleCheck,updateProduct).delete(checkLogin,roleCheck,deleteProduct).get(getProduct);
router.route("/reviews").get(getAllReviews)
module.exports = router;