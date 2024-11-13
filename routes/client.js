const express = require("express");
const router = express()
const authcontroller = require("../controllers/authController")

router.get("/", authcontroller.home)
router.get("/signup", authcontroller.signupGet)
router.post("/signup", authcontroller.signupPost)
router.get("/signin", authcontroller.signinGet)
router.post("/signin", authcontroller.signinPost)
router.get("/logout",authcontroller.logout)

module.exports = router