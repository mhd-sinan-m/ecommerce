const productModel = require("../models/productModel")
// const productExport = require("../utilities/details")

const addProdectPost = async (req, res) => {
  const { name, description, price, category, stock, code } = req.body

  // console.log('Request Body:', req.body);  // To check the form fields
  // console.log('Uploaded File:', req.file);  // To check the uploaded file info
  // console.log('Request Headers:', req.headers);

  try {
    const existU = await signupModel.findOne({code2})

    if (!name || !description || !price || !category || !stock || !code) {
      return res.status(400).render("client/error", { errr: 'All fields are required' })
    }
    if (existU) {
      res.status(404).render("client/error", { errr: "already taken" })
    }
    if (!req.file) {
      return res.status(400).send('No file uploaded')
    }
    const newProduct = new productModel({
      name,
      description,
      price,
      category,
      stock,
      code,
      image: '/images/upload/' + req.file.filename
    });

    await newProduct.save()
    res.status(200).redirect("/signin")

  } catch (err) {
    console.error('Product saving failed 500', err)
    res.status(500).json('Internal server error (product saving)', err)
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
  const updatedData = req.body;

  try {
    const product = await productModel.findOneAndUpdate({ code: code }, updatedData, { new: true, runValidators: true })

    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    return res.status(200).json({ message: 'Product edited successfully' })
  }
  catch (err) {
    console.error('Error editing product:', err);
    return res.status(500).json({ message: 'Error editing product', error: err })
  }
}
const product = async (req, res) => {
  const { code } = req.params;
  const product = await productModel.findOne({ code })
  res.status(200).render("admin/product", { product })
}


module.exports = { addProdectPost, deleteProduct, editProduct, product }