const orderModel = require("../models/orderModel");
const Product = require("../models/product");
const errorHandler = require('../utils/errorHandler');
const asyncError = require("../middleware/asyncError");

const order = asyncError(async (req, res, next) => {
    const { shippingInfo, orderedItems, paymentInfo, itmePrice} = req.body;
    const product = await Product.findById(orderedItems.product);
    if (product.stock === 0) {
        return next(new errorHandler("Out of stock",400))
    }
    const order = {
        shippingInfo, orderedItems, paymentInfo, itmePrice, user: req.user._id
    }
    const create = await orderModel.create(order)

    res.status(201).json({
        status: true,
        order
    });
})

//my orders
const myOrder = asyncError(async (req, res, next) => {
    const order = await orderModel.find({ user: req.user._id }).populate("user", "name email");
    res.status(200).json({
        status: true,
        orders: order
    })
})

//get single order
const singleOrder = asyncError(async (req, res, next) => {
    const order = await orderModel.findById(req.params.id)
    res.status(200).json({
        status: true,
        order
    })
})

//get all order admin
const getAllOrder = asyncError(async (req, res, next) => {
    const order = await orderModel.find();
    let totalAmount = 0;
    order.forEach(order => {
        totalAmount += order.itmePrice.totalPrice;
    })
    res.status(200).json({
        status: true,
        totalAmount,
        "totalOrders": order.length,
        order
    })
})

//update order --admin

const updateOrder = asyncError(async (req, res, next) => {
    const order = await orderModel.findById(req.params.id);
    if (order.orderStatus === "Delivered") {
        return next(new errorHandler("Order is already deliverd", 400));
    }
    order.orderStatus = req.body.status;
    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
    }
    const product = await Product.findById(order.orderedItems.product);
    product.stock -= order.orderedItems.quantity;
    if(product.stock < 0){
        product.stock = 0;
    }
    product.save({validateBeforeSave:false});

    order.save();
    res.status(200).json({
        status:true,
        message:"Order updated successfully"
    })
})


//delete order
const deleteOrder = asyncError(async (req, res, next) => {
    const order = await orderModel.findById(req.params.id);
    order.remove();
    res.status(200).json({
        status: true,
        message: "Order deleted successfully"
    })
})


module.exports = { order, myOrder, singleOrder, getAllOrder, deleteOrder ,updateOrder};