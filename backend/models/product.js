const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "product name not found"]
    },
    discription: {
        type: String,
        required: [true, "Product discription not found"]
    },
    price: {
        type: Number,
        maxLength: [6, "Price exceeded"],
        required: [true, "Please enter product price"]
    },
    rating: {
        type: Number,
        default: 0,
    },
    images: {
        public_id: {
            type: String,
            required: [true, "Public ID of image not found"]
        },
        url: {
            type: String,
            required: [true, "Image url not found"]
        }
    },
    category: {
        type: String,
        required: [true, "Category not found"]
    },
    stock: {
        type: Number,
        required: [true, "Stock not given"],
        maxLength: [4, "stock limit exceeded"],
        default: 0
    },
    numOfReviews: {
        type: Number,
        required: [true, "Reviews not given"],
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true
            },
            name: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                default: 0,
            },
            comment: {
                type: String,
                required: true,
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("Product", productSchema);