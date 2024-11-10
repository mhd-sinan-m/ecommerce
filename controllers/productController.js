const productModel = require("../models/productModel") 

const prodectPost = async (req,res) => {

    const {productName, productDescription, productPrice, productCategory, productImage , productStock} = req.body

    try {
        if (productName == "" || productDescription=='' || productPrice==''||productCategory==''||productImage==''||productStock==''){
            res.status(400).render("client/error", { errr: 'All Feilds Are required' })
        }
        else{
            const newProduct = new productModel({
                productName,
                productDescription,
                productPrice,
                productCategory,
                productImage,
                productStock
            })
            const product = await newProduct.save()
            res.status(200).redirect("/signin")
        }
    }
    catch (err){
        console.error('product saving failed 500', err);
        res.status(404).json('Internal server erro(product saving)',err);
    }
}
module.exports = {prodectPost}