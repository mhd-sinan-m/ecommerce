const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    productName: {
        type: String,
        required: false
    },
    productDescription: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    productCategory: {
        type: String,
        required: true
    },
    productImage: {
        type: String,
        default:""
    },
    productStock: {
        type:Number,
        required:true
    }
})
productModel = mongoose.model("productModel", productSchema)
module.exports = productModel

