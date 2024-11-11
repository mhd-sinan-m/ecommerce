const productModel = require("../models/productModel")

const dashboardGet = async (req, res) => {
    const products = await productModel.find(); // Fetch all products
    res.status(200).render('admin/dashboard', {products})
}

module.exports = { dashboardGet }