const express = require("express");
const { order, myOrder, singleOrder, getAllOrder, deleteOrder, updateOrder } = require("../controller/orderController");
const { checkLogin, roleCheck } = require("../middleware/auth");

const router = express.Router();

router.route("/createOrder").post(checkLogin, order);
router.route("/myOrder/").get(checkLogin, myOrder);
router.route("/order/:id").get(checkLogin, singleOrder);
router.route("/admin/allOrder").get(checkLogin, roleCheck, getAllOrder);
router.route("/admin/order/:id").delete(checkLogin, roleCheck, deleteOrder).put(checkLogin, roleCheck, updateOrder);

module.exports = router;