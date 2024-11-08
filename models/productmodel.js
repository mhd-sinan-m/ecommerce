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
        type: String,
        required: true
    },
    productCategory: {
        type: String,
        required: true
    },
    productImage: {
        type: String,
        default: 'user'
    }
})
productModel = mongoose.model("signupModel", productSchema)
module.exports = productModel

