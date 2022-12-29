const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
    shippingInfo: {
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        pinCode: {
            type: Number,
            required: true
        },
        mobileNumber: {
            type: Number,
            required: true,
        },
    },
    orderedItems:
    {
        name: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        product: {
            type: mongoose.Schema.ObjectId,
            ref: "Product",
            required: true
        }
    }
    ,
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        required: true
    },
    paymentInfo: {
        id: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        paidAt: {
            type: Date,
            default: Date.now(),
            required: true
        }
    },

    deliveredAt: {
        type: Date
    },
    orderStatus: {
        type: String,
        default: "Processing",
        required: true
    },
    itmePrice: {
        totalPrice: {
            type: Number,
            // default:0,
            required: true
        },
        taxPrice: {
            type: Number,
            // default:0,
            required: true
        },
        shippingPrice: {
            type: Number,
            // default:0,
            required: true
        },
    }
}
)

module.exports = mongoose.model("Order", orderSchema);