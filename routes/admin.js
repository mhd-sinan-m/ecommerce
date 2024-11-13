const express = require("express");
const router = express()
const admincontroller = require("../controllers/adminController");
const productController = require("../controllers/productController")
const adminSession = require("../middleware/adminSession");

// multer
const multer =require('multer')
const storage = require('../utilities/multer')
const upload = multer({ storage: storage });

router.get("/", adminSession, admincontroller.dashboardGet)

// prodect save
router.post('/products', adminSession,  upload.single('productImage'), productController.addProdectPost)
router.get('/product/:code', productController.product)
router.delete('/product/:code', adminSession, productController.deleteProduct)
router.put('/product/:code', adminSession, productController.editProduct)


module.exports = router