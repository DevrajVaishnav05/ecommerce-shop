const express = require('express');
const router = express.Router();
const {registerUser, loginUser, logout} = require('../controllers/authController')
const isLoggedin = require("../middlewares/isLoggedln");  // Ensure the middleware is correct
const productModel = require("../models/productModel");

router.post("/create", registerUser );
router.post("/login", loginUser );
router.get("/logout", logout );

router.get("/index",isLoggedin, async function(req, res) {
    const products = await productModel.find();
    res.render('shop/index', {products});
});


module.exports = router;
