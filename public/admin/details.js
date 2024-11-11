const productModel = require("../../models/productModel")

// const count = productModel.countDocuments()

const count = async () => {
    try {
        const c = await productModel.countDocuments();  // Executes the query and waits for the result
        return(c);
    } catch (err) {
        console.error("Error counting products:", err);
    }
}

module.exports = {count}