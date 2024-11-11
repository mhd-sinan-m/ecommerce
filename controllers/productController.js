const productModel = require("../models/productModel")
// const productExport = require("../utilities/details")

const addProdectPost = async (req,res) => {

    const {name, description, price, category, image , stock, code} = req.body

    try {
        if (name == "" || description=='' || price==''||category==''||image==''||stock==''||code==''){
            res.status(400).render("client/error", { errr: 'All Feilds Are required' })
        }
        else{
            const newProduct = new productModel({
                name,
                description,
                price,
                category,
                image,
                stock,
                code
              });
            const product = await newProduct.save()
            res.status(200).redirect("/signin")
        }
    }
    catch (err){
        console.error('product saving failed 500', err)
        res.status(404).json('Internal server erro(product saving)',err)
    }
}
const deleteProduct = async (req, res) => {
    const { code } = req.params;  

    try {
        const product = await productModel.findOneAndDelete({ code })

        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }

        return res.status(200).json({ message: 'Product deleted successfully' })
        
    } catch (err) {
        console.error('Error deleting product:', err);
        return res.status(500).json({ message: 'Error deleting product', error: err })
    }
}

const editProduct = async (req, res) => {
    const { code } = req.params; 

    try{
        const product = await productModel.findOneAndDelete({ code })

        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }
    }
    catch (err) {
            console.error('Error editing product:', err);
            return res.status(500).json({ message: 'Error editing product', error: err })
    }
}



module.exports = {addProdectPost, deleteProduct}