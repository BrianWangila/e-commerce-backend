const Product = require("../models/product");
const errorHandler = require('../utils/errorHandler');
const asyncError = require("../middleware/asyncError");
const APIfeatures = require("../utils/apifeatures");

//create product
const createProduct = asyncError(async (req, res) => {
    const productData = await Product.create(req.body)
    res.status(201).json({
        status: true,
        message: productData
    })
})

// get product
const getAllProduct = asyncError(async (req, res) => {
    const resPerPage = 10;
    const totalProducts = await Product.countDocuments();
    const apifeatures = new APIfeatures(Product.find(), req.query).search().pagination(resPerPage);
    const products = await apifeatures.query;
    res.status(200).json({
        status: true,
        products,
        countDocuments: totalProducts
    });
})


//update product
const updateProduct = asyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return next(new errorHandler("Product not found", 500));
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });
    res.status(200).json({
        status: true,
        product
    })
}
)
//delete product 
const deleteProduct = asyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return next(new errorHandler("Product not found", 500));
    }

    product = await Product.findByIdAndDelete(req.params.id, {
        new: true
    });

    res.status(200).json({
        status: true,
        message: "Product deleted successfully"
    })
})

//get single product
const getProduct = asyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return next(new errorHandler("Product not found", 500));
    }
    res.status(200).json({ status: true, product })
});

//create reviews 
const createReview = asyncError(async (req, res, next) => {
    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating,
        comment
    }
    const findProduct = await Product.findById(productId);
    let checkReview = false;
    let total_sum_rev = 0;
    findProduct.reviews.forEach(rev => {
        total_sum_rev += rev.rating;
        checkReview = rev.user.toString() === req.user._id.toString();
    });

    if (checkReview) {
        findProduct.reviews.forEach((rev) => {
            rev.rating = rating;
            rev.comment = comment;
            rev.name = req.user.name;
        })
    } else {
        findProduct.reviews.push(review);
        findProduct.numOfReviews = findProduct.reviews.length
    }
    //average of rating
    findProduct.rating = total_sum_rev / findProduct.reviews.length;
    findProduct.save({ validateBeforeSave: false });
    res.status(200).json({
        status: true
    })
})

const getAllReviews = asyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.id);
    res.status(200).json({
        status: true,
        message: product.reviews
    })
})


module.exports = { getAllProduct, createProduct, updateProduct, deleteProduct, getProduct, createReview, getAllReviews };