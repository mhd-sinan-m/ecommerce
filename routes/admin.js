const express = require("express");
const router = express()
const admincontroller = require("../controllers/adminController");
const productController = require("../controllers/productController")
const adminSession = require("../middleware/adminSession");

router.get("/", adminSession, admincontroller.dashboardGet)


// prodect save
router.post("/product", adminSession, productController.prodectPost)
module.exports = router