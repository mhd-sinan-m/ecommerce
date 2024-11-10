const model = require("../models/productModel") 

const prodectPost = async (req,res) => {
    const {productName, productDescription, productPrice, productCategory, productImage} = req.body

    try {
        if (productName == "" || productDescription=='' || productPrice==''||productCategory==''||productImage==''){
            res.status(400).render("client/error", { errr: 'All Feilds Are required' })
        }
        else{
            const newProduct = new model({
                productName,
                productDescription,
                productPrice,
                productCategory,
                productImage
            })
            const user = await newProduct.save()
            res.status(200).redirect("/signin")
        }
    }
    catch (err){
        console.error('product saving failed 500', err);
        res.status(500).json('Internal server erro(product saving)',err);
    }
}
module.exports = {prodectPost}