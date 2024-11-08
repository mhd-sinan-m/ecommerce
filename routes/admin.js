const express = require("express");
const router = express()
const admincontroller = require("../controllers/admincontroller");
const adminSession = require("../middleware/adminSession");

router.get("/", adminSession, admincontroller.dashboardGet)

module.exports = router