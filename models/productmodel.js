const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default:""
    },
    stock: {
        type:Number,
        required:true
    },
    code:{
        type:String
    }
})
productModel = mongoose.model("productModel", productSchema)
module.exports = productModel

